import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { Store } from '@ngrx/store';
import { BooksState } from '../../store/books/books.state';
import { Book } from '../../shared/models/book';
import { Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { selectFilteredBooks } from '../../store/books/books.selectors';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    TableComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private top = viewChild<ElementRef>('top');

  books$: Observable<Book[]>;

  private destroy$ = new Subject<void>();

  constructor(private store: Store<{ books: BooksState }>) {
    this.books$ = this.store.select(selectFilteredBooks);
  }
  ngOnInit(): void {}

  scrollToTop(): void {
    if (this.top()) {
      this.top()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
