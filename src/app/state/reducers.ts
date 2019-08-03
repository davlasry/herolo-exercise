import * as actions from './actions';
import {
  createReducer,
  on,
  Action,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import { IPredictions } from '../interfaces/predictions';

export interface AppState {
  currentWeather: any[];
  isCurrentWeatherLoading: boolean;
  predictions: IPredictions;
  isPredictionsLoading: boolean;
  currentCity: any;
  favorites: any[];
}

export const initialState: AppState = {
  favorites: [],
  currentWeather: null,
  isCurrentWeatherLoading: false,
  predictions: null,
  isPredictionsLoading: false,
  currentCity: null
};

export const weatherReducer = createReducer(
  initialState,
  on(actions.getCurrentWeather, state => {
    return { ...state, isCurrentWeatherLoading: true };
  }),
  on(actions.setCurrentWeather, (state, { currentWeather, currentCity }) => {
    return {
      ...state,
      currentWeather,
      currentCity,
      isCurrentWeatherLoading: false
    };
  }),
  on(actions.getPredictions, state => {
    return { ...state, isPredictionsLoading: true };
  }),
  on(actions.setPredictions, (state, { predictions }) => {
    return { ...state, predictions, isPredictionsLoading: false };
  }),
  on(actions.addToFavorites, state => {
    return {
      ...state,
      favorites: [...state.favorites, state.currentCity]
    };
  }),
  on(actions.removeFromFavorites, state => {
    return {
      ...state,
      favorites: state.favorites.filter(
        item => item.Key !== state.currentCity.Key
      )
    };
  })
);

export function reducer(state: AppState | undefined, action: Action) {
  return weatherReducer(state, action);
}

// Selectors
export const getWeatherState = createFeatureSelector<any>('weatherState');

export const getFavorites = createSelector(
  getWeatherState,
  state => {
    return state.favorites;
  }
);

export const getFavoritesKeys = createSelector(
  getFavorites,
  favorites => {
    return favorites.map(favorite => favorite.Key);
  }
);

export const getCurrentCity = createSelector(
  getWeatherState,
  state => {
    return state.currentCity;
  }
);

export const isCurrentCityInFavorites = createSelector(
  getFavoritesKeys,
  getCurrentCity,
  (keys, currentCity) => {
    return !!currentCity && !!keys && keys.indexOf(currentCity.Key) > -1;
  }
);

export const getNumberOfFavorites = createSelector(
  getFavorites,
  favorites => {
    return favorites.length;
  }
);
