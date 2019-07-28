import { createAction, props } from '@ngrx/store';

export const addToFavorites = createAction(
  'Add Location To Favorites',
  props<{ city: any }>()
);
export const removeFromFavorites = createAction(
  'Remove Location From Favorites',
  props<{ city: any }>()
);
