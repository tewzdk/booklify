import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  model,
  signal,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { Book } from '../../shared/models/book';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BooksService } from '../../services/books.service';
import { AutocompleteComponent } from '../../shared/components/autocomplete/autocomplete.component';
import { OpenLibraryBook } from '../../shared/models/open-library-book';

interface DialogData {
  book: Book;
}
@Component({
  selector: 'app-book-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    CommonModule,
    AutocompleteComponent,
  ],
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.scss',
})
export class BookDialogComponent {
  @ViewChild('titleControl') titleControl!: ElementRef;
  readonly bookService = inject(BooksService);
  readonly dialogRef = inject(MatDialogRef<BookDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly book = model(this.data.book);

  step = signal(0);
  deleting = signal(false);

  bookForm: FormGroup;

  constructor() {
    this.bookForm = this.bookService.initialBookFormGroup();
  }

  ngOnInit(): void {
    if (this.book()) {
      this.bookForm.patchValue({
        id: this.book().id,
        title: this.book().title,
        firstPublishYear: this.book().firstPublishYear,
        author: this.book().author,
        coverId: this.book().coverId,
        summary: this.book().summary,
      });
      this.step.set(1);
    }
  }

  bookSelectedEvent(book: OpenLibraryBook) {
    if (!book) return;

    this.bookForm.patchValue({
      id: book.key,
      title: book.title,
      firstPublishYear: book.first_publish_year,
      author: book.author_name[0],
      coverId: book.cover_i,
    });

    this.step.set(1);
  }

  deletingBook(deleting: boolean) {
    this.deleting.set(deleting);
  }

  deleteBook() {
    this.bookService.deleteBook(this.bookForm.value?.id);
    this.dialogRef.close();
  }

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update((i) => i + 1);
  }

  prevStep() {
    this.step.update((i) => i - 1);
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    if (this.isCreateMode) {
      this.bookService.createBook(this.bookForm.value);
    } else {
      this.bookService.updateBook(this.bookForm.value);
    }

    this.dialogRef.close();
  }

  get isCreateMode() {
    return !this.book();
  }
}
