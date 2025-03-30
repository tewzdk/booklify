import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksState } from '../store/books/books.state';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private store: Store<{ books: BooksState }>) {}
}
