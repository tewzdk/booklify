import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BookDialogComponent } from '../../dialogs/book-dialog/book-dialog.component';
import { Observable } from 'rxjs';
import { Book } from '../../shared/models/book';
import { select, Store } from '@ngrx/store';
import { BooksState } from '../../store/books/books.state';
import { CommonModule } from '@angular/common';
import { GridDisplayComponent } from '../../shared/components/grid-display/grid-display.component';
import { SearchFieldComponent } from '../../shared/components/search-field/search-field.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    GridDisplayComponent,
    SearchFieldComponent,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  books$: Observable<Book[]>;

  constructor(
    private store: Store<{ books: BooksState }>,
    private dialog: MatDialog
  ) {
    this.books$ = this.store.pipe(
      select((state) => {
        const filter = state.books.filter;
        return state.books.books.filter((book: Book) =>
          book.title.toLowerCase().includes(filter.toLowerCase())
        );
      })
    );
  }

  onUpdateBook(book: Book): void {
    this.dialog.open(BookDialogComponent, {
      width: '800px',
      data: { book: book },
    });
  }

  onCreateNewBook() {
    this.dialog.open(BookDialogComponent, {
      width: '800px',
      data: { book: null },
    });
  }
}
