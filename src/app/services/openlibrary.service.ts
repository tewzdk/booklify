import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';

export interface OpenLibraryBook {
  author_name: string[];
  cover_i: number;
  first_publish_year: number;
  key: string;
  title: string;
  language: string[];
}
@Injectable({
  providedIn: 'root',
})
export class OpenlibraryService {
  private readonly http = inject(HttpClient);
  openLibraryBooks = signal([]);
  loading = signal(false);

  searchOpenLibrary(searchTerm: string): void {
    this.loading.set(true);
    this.http
      .get<any>(`https://openlibrary.org/search.json?q=${searchTerm}`)
      .subscribe((response) => {
        this.openLibraryBooks.set(response?.docs);
        this.loading.set(false);
      });
  }
}
