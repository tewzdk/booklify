import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Theme, ThemeService } from '../../../services/theme.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatButtonToggleModule],
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
