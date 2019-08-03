import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getFavorites } from 'src/app/state/reducers';
import * as actions from '../../state/actions';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  favorites;
  favorites$;

  constructor(private store: Store<any>) {
    this.favorites$ = store.pipe(select(getFavorites));
  }

  ngOnInit() {}

  onFavoriteClick(favoriteData) {
    this.store.dispatch(actions.setCurrentCity({ city: favoriteData }));
  }
}
