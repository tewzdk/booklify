import { createReducer, on } from '@ngrx/store';
import * as BooksActions from './books.actions';
import { initialState } from './books.state';
import { Book } from '../../shared/models/book';

export const booksReducer = createReducer(
  initialState,
  on(BooksActions.filterBooks, (state, { searchTerm }) => ({
    ...state,
    filter: searchTerm,
  })),
  on(BooksActions.loadBooks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BooksActions.createBook, (state, { book }) => ({
    ...state,
    loading: false,
    books: [...state.books, book],
  })),
  on(BooksActions.updateBook, (state, { book }) => ({
    ...state,
    loading: false,
    books: state.books.map((b: Book) => (b.id === book.id ? book : b)),
  })),
  on(BooksActions.deleteBook, (state, { bookId }) => ({
    ...state,
    loading: false,
    books: state.books.filter((b: Book) => b.id !== bookId),
  }))
);
