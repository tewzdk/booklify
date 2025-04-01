import { Component, effect, OnDestroy, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
} from 'rxjs';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'search-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent implements OnDestroy {
  searchValueChange = output<string>();
  value: string = '';
  private searchInput$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private searchService: SearchService) {
    effect(() => {
      this.value = this.searchService.searchValue();
      this.searchValueChange.emit(this.value);
    });
    this.searchInput$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((searchTerm) => {
        this.performSearch(searchTerm);
      });
  }

  onClear() {
    this.value = '';
    this.performSearch(this.value);
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchInput$.next(inputValue);
  }

  performSearch(term: string): void {
    this.searchService.updateSearchValue(term);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
