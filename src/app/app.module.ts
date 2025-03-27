import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { booksReducer } from './store/books/books.reducer';
import { BooksEffects } from './store/books/books.effects';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({ books: booksReducer }),
    EffectsModule.forRoot([BooksEffects]),
  ],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'longDate' },
    },
  ],

  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
