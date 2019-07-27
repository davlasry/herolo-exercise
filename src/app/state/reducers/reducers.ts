import * as actions from '../actions';

export interface State {
  // favorites: Favorite[]
  favorites: any[];
}

export const initialState: State = {
  favorites: []
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ADD_TO_FAVORITES: {
      return { ...state, favorites: action.payload };
    }
  }
  return state;
}
