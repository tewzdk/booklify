import { createAction, props } from '@ngrx/store';
import { Book } from '../../shared/models/book';

// Load Books
export const loadBooks = createAction('[Books] Load Books');

export const createBook = createAction(
  '[Books] Create Book',
  props<{ book: Book }>()
);

export const updateBook = createAction(
  '[Books] Update Book',
  props<{ book: Book }>()
);

export const deleteBook = createAction(
  '[Books] Delete Book',
  props<{ bookId: string }>()
);

export const filterBooks = createAction(
  '[Books] Filter Books',
  props<{ searchTerm: string }>()
);

export const incrementPage = createAction('[Books] Increment Page');
