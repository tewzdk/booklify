import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class BooksEffects {
  constructor() {}
  actions$ = inject(Actions);
}
