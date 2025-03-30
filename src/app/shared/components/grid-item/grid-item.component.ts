import { Component, input } from '@angular/core';
import { Book } from '../../models/book';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'grid-item',
  standalone: true,
  imports: [MatGridListModule, CommonModule],
  templateUrl: './grid-item.component.html',
  styleUrl: './grid-item.component.scss',
})
export class GridItemComponent {
  book = input.required<Book>();

  defaultImageUrl: string = 'assets/default-image.jpg';
  backdropPath = '';
  imageUrl = '';

  ngOnInit(): void {
    this.backdropPath = this.book().coverId;
    this.imageUrl = `https://covers.openlibrary.org/b/id/${this.backdropPath}-M.jpg`;
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultImageUrl;
  }
}
