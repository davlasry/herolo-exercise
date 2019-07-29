import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { FavoritesService } from '../services/favorites.service';
import { addToFavorites, getCurrentWeather } from './actions';

@Injectable()
export class WeatherEffects {
  getCurrentWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentWeather),
      mergeMap(() =>
        this.favoritesService
          .getCurrentWeather('Paris')
          .pipe(map(res => addToFavorites({ city: res })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService
  ) {}
}
