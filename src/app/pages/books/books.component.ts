import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Book } from '../../shared/models/book';
import { select, Store } from '@ngrx/store';
import { BooksState } from '../../store/books/books.state';
import { BookDialogComponent } from '../../dialogs/book-dialog/book-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { GridDisplayComponent } from '../../shared/components/grid-display/grid-display.component';
import { SearchFieldComponent } from '../../shared/components/search-field/search-field.component';
import { selectFilteredBooks } from '../../store/books/books.selectors';

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
export class BooksComponent implements OnDestroy {
  books$: Observable<Book[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<{ books: BooksState }>,
    private dialog: MatDialog
  ) {
    this.books$ = this.store.select(selectFilteredBooks);
  }

  onUpdateBook(book: Book): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '800px',
      data: { book },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {});
  }

  onCreateNewBook(): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '800px',
      data: { book: null },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
