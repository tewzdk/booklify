import { createSelector } from '@ngrx/store';
import { BooksState } from './books.state';

export const selectBooksState = (state: { books: BooksState }) => state.books;

export const selectFilteredBooks = createSelector(selectBooksState, (state) => {
  const filter = state.filter.toLowerCase();
  return state.books.filter((book) =>
    book.title.toLowerCase().includes(filter)
  );
});
