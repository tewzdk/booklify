import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Theme, ThemeService } from '../../../services/theme.service';
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  private readonly themeService = inject(ThemeService);
  darkMode: boolean = false;

  toggleTheme() {
    this.darkMode = this.themeService.toggleTheme();
  }
}
