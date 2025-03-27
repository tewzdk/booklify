import { createSelector } from '@ngrx/store';
import { BooksState } from './books.state';

export const selectBooksState = (state: { books: BooksState }) =>
  state.books;

export const selectCurrentBooksPage = createSelector(
  selectBooksState,
  (state: BooksState) => state.page
);


export const selectTotalBooksPage = createSelector(
  selectBooksState,
  (state: BooksState) => state.total_pages
);
