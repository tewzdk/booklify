import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BookDialogComponent } from '../../dialogs/book-dialog/book-dialog.component';
import { Observable } from 'rxjs';
import { Book } from '../../shared/models/book';
import { select, Store } from '@ngrx/store';
import { BooksState } from '../../store/books/books.state';
import { CommonModule } from '@angular/common';
import { GridDisplayComponent } from '../../shared/components/grid-display/grid-display.component';
import * as BooksActions from '../../store/books/books.actions';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    GridDisplayComponent,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(
    private store: Store<{ books: BooksState }>,
    private dialog: MatDialog
  ) {
    this.books$ = this.store.pipe(select((state) => state.books.books));
  }
  ngOnInit(): void {
    this.books$.subscribe((books) => {});
  }

  openDialog(book: Book): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '800px',
      data: { book: book },
    });

    dialogRef.afterClosed().subscribe((updatedBook) => {
      this.store.dispatch(BooksActions.updateBook({ book: updatedBook }));
    });
  }

  onCreateNewBook() {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '800px',
      data: { book: null },
    });

    dialogRef.afterClosed().subscribe((book) => {
      if (book) {
        this.store.dispatch(BooksActions.createBook({ book }));
      }
    });
  }
}
