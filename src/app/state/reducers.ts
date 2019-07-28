import * as actions from './actions';
import { createReducer, on } from '@ngrx/store';

export interface State {
  // favorites: Favorite[]
  favorites: any[];
}

export const initialState: State = {
  favorites: []
};

export const weatherReducer = createReducer(
  initialState,
  on(actions.addToFavorites, (state, { city }) => {
    return { ...state, favorites: [...state.favorites, city] };
  }),
  on(actions.removeFromFavorites, (state, { city }) => {
    return {
      ...state,
      favorites: state.favorites.filter(item => item !== city)
    };
  })
);

export const getFavorites = (state: State) => state.favorites;
