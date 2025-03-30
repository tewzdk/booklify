import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BooksActions from './books.actions';
import { map, mergeMap, of } from 'rxjs';

@Injectable()
export class BooksEffects {
  constructor() {}
  actions$ = inject(Actions);

}
