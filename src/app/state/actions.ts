import { Action } from '@ngrx/store';

export const ADD_TO_FAVORITES = ['Add Location To Favorite'];

export class AddToFavorite implements Action {
  readonly type = ADD_TO_FAVORITES;
  constructor(public payload: any) {}
}

export type Actions = AddToFavorite | any;
