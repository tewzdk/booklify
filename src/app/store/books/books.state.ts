import { Book } from '../../shared/models/book';

export interface BooksState {
  books: Book[]; // List of books
  page: number; // Current page
  filter: string;
  total_pages: number; // Total number of pages
  loading: boolean; // Loading state
  error: string | null; // Error message
}

export const initialState: BooksState = {
  books: [
    {
      id: 'ba95485a-c46d-4c19-9481-012c962069fd',
      title: 'The Great Gatsby',
      languages: ['en'],
      author: 'F. Scott Fitzgerald',
      publisher: 'Scribner',
      firstPublishYear: 1925,
      coverId: '10590366',
      summary: 'A novel set in the 1920s that tells the story of Jay Gatsby, a mysterious millionaire, and his obsession with the beautiful Daisy Buchanan.',
    },
    {
      id: 'fd3603d1-fdb6-4892-a512-01a6fab9f90d',
      title: 'Onyx Storm',
      languages: ['en', 'fr'],
      author: 'Rebecca Yarros',
      publisher: 'Scribner',
      firstPublishYear: 2025,
      coverId: '14826089',
      summary: 'A gripping tale of love and loss set against the backdrop of a world on the brink of destruction.',
    },
  ],
  filter: '',
  page: 1,
  total_pages: 0,
  loading: false,
  error: null,
};
