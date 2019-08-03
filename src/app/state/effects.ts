import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, concatMap, switchMap } from 'rxjs/operators';
import { FavoritesService } from '../services/favorites.service';
import {
  getCurrentWeather,
  setCurrentWeather,
  getPredictions,
  setPredictions,
  setCurrentCity
} from './actions';

@Injectable()
export class WeatherEffects {
  getCurrentWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCurrentWeather),
      concatMap(({ city }) => {
        return this.favoritesService.getCurrentWeather(city.Key).pipe(
          map(res => {
            return setCurrentWeather({
              currentWeather: res[0],
              currentCity: city
            });
          })
        );
      })
    );
  });

  getPredictions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getPredictions),
      concatMap(({ city }) => {
        return this.favoritesService.getFiveDaysPredictions(city.Key).pipe(
          map(predictions => {
            return setPredictions({ predictions });
          })
        );
      })
    );
  });

  setCurrentCity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setCurrentCity),
      switchMap(({ city }) => {
        return [getPredictions({ city }), getCurrentWeather({ city })];
      })
    );
  });

  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService
  ) {}
}
