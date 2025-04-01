export interface Book {
  id?: string;
  title: string;
  languages?: string[];
  author: string;
  publisher: string;
  firstPublishYear: number;
  coverId: string;
  summary?: string;
}
