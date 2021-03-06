import { createAction, props } from '@ngrx/store';

export const setCurrentCity = createAction(
  'Set Current City',
  props<{ city: any }>()
);

export const getCurrentWeather = createAction(
  'Get Current Weather',
  props<{ city: any }>()
);

export const setCurrentWeather = createAction(
  'Set Current Weather',
  props<{ currentWeather: any; currentCity: any }>()
);

export const getPredictions = createAction(
  'Get Predictions Weather',
  props<{ city: any }>()
);

export const setPredictions = createAction(
  'Set Predictions Weather',
  props<{ predictions: any }>()
);

export const addToFavorites = createAction('Add Location To Favorites');

export const removeFromFavorites = createAction(
  'Remove Location From Favorites'
);
