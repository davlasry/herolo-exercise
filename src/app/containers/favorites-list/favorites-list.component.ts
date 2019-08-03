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

    this.favorites$.subscribe(res => {
      console.log('res:', res);
    });
  }

  ngOnInit() {}

  onFavoriteClick(favoriteData) {
    console.log('favoriteKey:', favoriteData);
    this.store.dispatch(actions.getCurrentWeather({ city: favoriteData }));
    this.store.dispatch(actions.getPredictions({ city: favoriteData }));
    this.store.dispatch(actions.setCurrentCity({ city: favoriteData }));
  }
}
