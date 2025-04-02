import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  text: string;
  code: string;
  primary: string;
}

export const default_themes: Theme[] = [
  {
    text: 'Red',
    code: 'red-palette',
    primary: '#c00100',
  },
  {
    text: 'Green',
    code: 'green-palette',
    primary: '#026e00',
  },
  {
    text: 'Blue',
    code: 'blue-palette',
    primary: '#343dff',
  },
  {
    text: 'Yellow',
    code: 'yellow-palette',
    primary: '#626200',
  },
  {
    text: 'Cyan',
    code: 'cyan-palette',
    primary: '#006a6a',
  },
  {
    text: 'Magenta',
    code: 'magenta-palette',
    primary: '#a900a9',
  },
  {
    text: 'Orange',
    code: 'orange-palette',
    primary: '#964900',
  },
  {
    text: 'Chartreuse',
    code: 'chartreuse-palette',
    primary: '#326b00',
  },
  {
    text: 'Spring Green',
    code: 'spring-green-palette',
    primary: '#006d33',
  },
  {
    text: 'Azure',
    code: 'azure-palette',
    primary: '#005cbb',
  },
  {
    text: 'Violet',
    code: 'violet-palette',
    primary: '#7d00fa',
  },
  {
    text: 'Rose',
    code: 'rose-palette',
    primary: '#ba005c',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  currentTheme = signal('red-palette');

  theme = signal<ThemeMode>('light');

  constructor() {}

  setMaterialThemeColor(theme: string) {
    this.document.documentElement.classList.remove(this.currentTheme());
    this.document.documentElement.classList.add(theme);
    this.currentTheme.set(theme);
  }

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
