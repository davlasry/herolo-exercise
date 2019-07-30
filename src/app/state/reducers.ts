import * as actions from './actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
  currentWeather: any[];
  currentCity: any;
  predictions: any;
  favorites: any[];
}

export const initialState: State = {
  favorites: [],
  currentWeather: null,
  currentCity: null,
  predictions: null
};

export const weatherReducer = createReducer(
  initialState,
  on(actions.setCurrentWeather, (state, { currentWeather, currentCity }) => {
    return { ...state, currentWeather, currentCity };
  }),
  on(actions.setPredictions, (state, { predictions }) => {
    console.log('predictions:', predictions);
    return { ...state, predictions };
  }),
  on(actions.addToFavorites, (state, { city }) => {
    return {
      ...state,
      favorites: [...state.favorites, city]
    };
  }),
  on(actions.removeFromFavorites, (state, { city }) => {
    return {
      ...state,
      favorites: state.favorites.filter(item => item !== city)
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return weatherReducer(state, action);
}

export const getFavorites = (state: State) => state.favorites;
