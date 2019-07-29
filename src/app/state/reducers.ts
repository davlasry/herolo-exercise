import * as actions from './actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
  currentWeather: any[];
  favorites: any[];
}

export const initialState: State = {
  favorites: [],
  currentWeather: []
};

export const weatherReducer = createReducer(
  initialState,
  on(actions.setCurrentWeather, (state, { currentWeather }) => {
    return { ...state, currentWeather };
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

export const getFavorites = (state: State) => state.favorites;
