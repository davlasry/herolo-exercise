import * as actions from './actions';
import {
  createReducer,
  on,
  Action,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

export interface State {
  currentWeather: any[];
  isCurrentWeatherLoading: boolean;
  predictions: any;
  isPredictionsLoading: boolean;
  currentCity: any;
  favorites: any[];
}

export const initialState: State = {
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

export function reducer(state: State | undefined, action: Action) {
  return weatherReducer(state, action);
}

export const getWeatherState = createFeatureSelector<any>('weatherState');

export const getFavorites = createSelector(
  getWeatherState,
  state => {
    console.log('favorites:', state.favorites);
    return state.favorites;
  }
);
// export const getCurrentCity = (state: State) => state.currentCity;

export const getFavoritesKeys = createSelector(
  getFavorites,
  favorites => {
    console.log('favorites:', favorites);
    return favorites.map(favorite => favorite.Key);
  }
);

export const getCurrentCity = createSelector(
  getWeatherState,
  state => {
    console.log('currentCity:', state.currentCity);
    return state.currentCity;
  }
);

export const isCurrentCityInFavorites = createSelector(
  getFavoritesKeys,
  getCurrentCity,
  (keys, currentCity) => {
    console.log('keys:', keys);
    // console.log('currentCity:', currentCity);
    return !!currentCity && !!keys && keys.indexOf(currentCity.Key) > -1;
  }
);

export const getNumberOfFavorites = createSelector(
  getFavorites,
  favorites => {
    return favorites.length;
  }
);
