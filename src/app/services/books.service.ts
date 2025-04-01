import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksState } from '../store/books/books.state';
import { Book } from '../shared/models/book';
import * as BooksActions from '../store/books/books.actions';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly store = inject(Store<{ books: BooksState }>);
  private readonly formBuilder = inject(FormBuilder);

  createBook(book: Book) {
    if (book === undefined) return;

    if (book.id === null) {
      book.id = this.generateRandomId();
    }
    this.store.dispatch(BooksActions.createBook({ book }));
  }

  updateBook(book: Book) {
    if (book === undefined) return;

    this.store.dispatch(BooksActions.updateBook({ book }));
  }

  deleteBook(bookId: string) {
    this.store.dispatch(BooksActions.deleteBook({ bookId }));
  }

  initialBookFormGroup() {
    return this.formBuilder.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(3)]],
      firstPublishYear: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{4}$')],
      ],
      author: ['', [Validators.required, Validators.minLength(3)]],
      publisher: [''],
      coverId: [''],
      summary: [''],
    });
  }

  private generateRandomId(): string {
    return (
      'id-' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
    );
  }
}
