import { CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import {
  OpenLibraryBook,
  OpenlibraryService,
} from '../../../services/openlibrary.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'autocomplete',
  imports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent implements OnDestroy {
  bookSelectedEvent = output<OpenLibraryBook>();

  private searchInput$ = new Subject<string>();
  private destroy$ = new Subject<void>();
  filteredOptions: OpenLibraryBook[] = [];
  loading: boolean = false;

  searchValue = '';

  constructor(private openlibraryService: OpenlibraryService) {
    effect(() => {
      this.loading = this.openlibraryService.loading();
      this.filteredOptions = this.openlibraryService.openLibraryBooks();
    });
    this.searchInput$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((searchTerm) => {
        const trimmedValue = searchTerm.trim();

        if (trimmedValue === '') {
          this.openlibraryService.openLibraryBooks.set([]);
          return;
        }

        this.openlibraryService.searchOpenLibrary(searchTerm);
      });
  }

  searchLibrary(event: Event) {
    this.searchInput$.next((event.target as HTMLInputElement)?.value);
  }

  bookSelected(book: MatAutocompleteSelectedEvent) {
    this.bookSelectedEvent.emit(book.option.value);
  }

  displayFn(openLibraryBook: OpenLibraryBook): string {
    return openLibraryBook?.title;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.openlibraryService.openLibraryBooks.set([]);
  }
}
