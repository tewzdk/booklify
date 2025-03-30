import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { Book } from '../../shared/models/book';

interface DialogData {
  book: Book;
}
@Component({
  selector: 'app-book-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.scss',
})
export class BookDialogComponent {
  readonly dialogRef = inject(MatDialogRef<BookDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly book = model(this.data.book);

  bookForm: FormGroup;

  searchControl = new FormControl('');

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(3)]],
      firstPublishYear: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{4}$')],
      ], // validates as a 4-digit number
      author: ['', [Validators.required, Validators.minLength(3)]],
      publisher: [''],
      coverId: [''],
    });
  }

  ngOnInit(): void {
    if (this.book()) {
      this.bookForm.patchValue({
        id: this.book().id,
        title: this.book().title,
        firstPublishYear: this.book().firstPublishYear,
        author: this.book().author,
        publisher: this.book().publisher,
        coverId: this.book().coverId,
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }
    const book = this.bookForm.value;
    this.dialogRef.close(book);
  }
}
