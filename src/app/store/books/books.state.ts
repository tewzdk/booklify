import { Book } from "../../shared/models/book";

export interface BooksState {
  books: Book[]; // List of movies
  page: number; // Current page
  total_pages: number; // Total number of pages
  loading: boolean; // Loading state
  error: string | null; // Error message
}

export const initialState: BooksState = {
  books: [],
  page: 1,
  total_pages: 0,
  loading: false,
  error: null,
};
