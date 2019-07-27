import * as actions from '../actions';
import { Action } from 'rxjs/internal/scheduler/Action';
import { createReducer, on } from '@ngrx/store';

export interface State {
  // favorites: Favorite[]
  favorites: any[];
}

export const initialState: State = {
  favorites: []
};

const scoreboardReducer = createReducer(
  initialState,
  on(actions.ADD_TO_FAVORITES, state => ({
    ...state,
    favorites: action.payload
  }))
);
export function weatherReducer(
  state = initialState,
  action: actions.Actions
): State {
  switch (action.type) {
    case actions.ADD_TO_FAVORITES: {
      return { ...state, favorites: action.payload };
    }

    case actions.ADD_TO_FAVORITES: {
      return {
        ...state,
        favorites: state.favorites.filter(todo => todo.id !== action.payload)
      };
    }
  }
  return state;
}

export function reducer(state: State | undefined, action: Action) {
  return weatherReducer(state, action);
}
