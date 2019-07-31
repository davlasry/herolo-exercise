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
    LocalizedName: 'Tel Aviv'
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

// export const getWeatherState = (state: any) => state.weatherState;
export const getFavorites = (state: State) => state.favorites;

export const getFavoritesKeys = createSelector(
  getFavorites,
  state => {
    console.log('favorites:', state);
    return state;
    // favorites.map(favorite => favorite.Key);
  }
);

// export const isCurrentCityInFavorites = createSelector(
//   getFavoritesKeys,
//   getCurrentCityKey,
//   (keys, currentKey) => {
//     return !!currentKey && keys.indexOf(currentKey) > -1;
//   }
// );
