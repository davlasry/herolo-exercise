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
  currentCity: any;
  predictions: any;
  favorites: any[];
}

export const initialState: State = {
  favorites: [],
  currentWeather: null,
  currentCity: {
    Key: '215854',
    LocalizedName: 'Tel Aviv',
    Country: {
      LocalizedName: 'Israel'
    }
  },
  predictions: null
};

export const weatherReducer = createReducer(
  initialState,
  on(actions.setCurrentWeather, (state, { currentWeather, currentCity }) => {
    return { ...state, currentWeather, currentCity };
  }),
  on(actions.setPredictions, (state, { predictions }) => {
    return { ...state, predictions };
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
    // favorites.map(favorite => favorite.Key);
  }
);

export const getCurrentCity = createSelector(
  getWeatherState,
  state => {
    console.log('currentCity:', state.currentCity);
    return state.currentCity.Key;
    // favorites.map(favorite => favorite.Key);
  }
);

export const isCurrentCityInFavorites = createSelector(
  getFavoritesKeys,
  getCurrentCity,
  (keys, currentCityKey) => {
    return !!currentCityKey && !!keys && keys.indexOf(currentCityKey) > -1;
  }
);
