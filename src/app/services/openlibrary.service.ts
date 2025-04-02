import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { OpenLibraryBook } from '../shared/models/open-library-book';
import { OpenLibraryResponse } from '../shared/models/open-library-response';

@Injectable({
  providedIn: 'root',
})
export class OpenlibraryService {
  private readonly OPEN_LIBRARY_API_URL = 'https://openlibrary.org/search.json';
  private readonly http = inject(HttpClient);
  openLibraryBooks = signal<OpenLibraryBook[]>([]);
  loading = signal(false);

  searchOpenLibrary(searchTerm: string): void {
    const trimmedSearchTerm = searchTerm.trim();
    this.loading.set(true);
    this.http
      .get<any>(
        `${this.OPEN_LIBRARY_API_URL}?q=${encodeURIComponent(
          trimmedSearchTerm
        )}`
      )
      .subscribe((response: OpenLibraryResponse) => {
        this.openLibraryBooks.set(response?.docs);
        this.loading.set(false);
      });
  }
}
