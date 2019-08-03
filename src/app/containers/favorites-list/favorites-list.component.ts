import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getFavorites } from 'src/app/state/reducers';
import * as actions from '../../state/actions';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent {
  favorites;
  favorites$;

  constructor(private store: Store<any>, private router: Router) {
    this.favorites$ = store.pipe(select(getFavorites));
  }

  onFavoriteClick(favoriteData) {
    this.store.dispatch(actions.setCurrentCity({ city: favoriteData }));
    this.router.navigate(['/']);
  }
}
