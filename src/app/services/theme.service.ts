import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  theme = signal<Theme>('light');

  constructor() {}

  toggleTheme() {
    if (this.theme() === 'light') {
      this.document.documentElement.classList.add('dark-mode');
    } else {
      this.document.documentElement.classList.remove('dark-mode');
    }
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');

    return this.theme() === 'dark';
  }

  isDarkMode(): boolean {
    return this.theme() === 'dark';
  }
}
