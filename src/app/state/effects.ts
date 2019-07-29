import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { FavoritesService } from '../services/favorites.service';
import {
  addToFavorites,
  getCurrentWeather,
  setCurrentWeather
} from './actions';

@Injectable()
export class WeatherEffects {
  getCurrentWeather$ = createEffect(() => {
    console.log('inside effect');
    return this.actions$.pipe(
      ofType(getCurrentWeather),
      mergeMap(({ city }) =>
        this.favoritesService.getCurrentWeather(city).pipe(
          map(res => {
            console.log('res:', res);
            return setCurrentWeather({ currentWeather: res[0] });
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService
  ) {}
}
