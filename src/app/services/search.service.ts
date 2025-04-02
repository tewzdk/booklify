import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksState } from '../store/books/books.state';
import * as BooksActions from '../store/books/books.actions';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly store = inject(Store<{ books: BooksState }>);

  private searchValueSignal = signal<string>('');

  get searchValue() {
    return this.searchValueSignal.asReadonly();
  }
  updateSearchValue(value: string): void {
    this.store.dispatch(BooksActions.filterBooks({ searchTerm: value }));
  }
}
