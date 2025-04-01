import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
