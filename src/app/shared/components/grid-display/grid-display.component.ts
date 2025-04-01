import { Component, input, output } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { GridItemComponent } from '../grid-item/grid-item.component';

@Component({
  selector: 'grid-display',
  standalone: true,
  imports: [CommonModule, GridItemComponent],
  templateUrl: './grid-display.component.html',
  styleUrl: './grid-display.component.scss',
})
export class GridDisplayComponent {
  books$ = input.required<Observable<Book[]>>();

  onGridItemClick = output<Book>();
  onCreateNewBook = output<void>();
}
