import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksState } from '../store/books/books.state';
import * as BooksActions from '../store/books/books.actions';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly store = inject(Store<{ books: BooksState }>);

  // Signal to store the search value
  private searchValueSignal = signal<string>('');

  // Getter for the signal to expose it as readonly
  get searchValue() {
    return this.searchValueSignal.asReadonly();
  }

  // Method to update the search value
  updateSearchValue(value: string): void {

    this.store.dispatch(BooksActions.filterBooks({ searchTerm: value }));
  }
}
