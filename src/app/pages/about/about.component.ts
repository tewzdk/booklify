import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ThemeService, default_themes } from '../../services/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Theme } from '../../shared/models/theme';

@Component({
  selector: 'app-about',
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  private readonly themeService = inject(ThemeService);
  themes: Theme[] = default_themes;

  onThemeButtonClick(theme: string) {
    this.themeService.setMaterialThemeColor(theme);
  }
}
