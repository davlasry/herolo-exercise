import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, concatMap } from 'rxjs/operators';
import { FavoritesService } from '../services/favorites.service';
import {
  getCurrentWeather,
  setCurrentWeather,
  getPredictions,
  setPredictions
} from './actions';

@Injectable()
export class WeatherEffects {
  getCurrentWeather$ = createEffect(() => {
    console.log('getCurrentWeather effect');
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
    console.log('getPredictions effect');
    return this.actions$.pipe(
      ofType(getPredictions),
      concatMap(({ city }) => {
        return this.favoritesService.getFiveDaysPredictions(city.Key).pipe(
          map(predictions => {
            console.log('predictions:', predictions);
            return setPredictions({ predictions });
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService
  ) {}
}
