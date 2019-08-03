import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getFavorites } from 'src/app/state/reducers';
import * as actions from '../../state/actions';
import { ICity } from 'src/app/interfaces/city';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent {
  favorites$: Observable<ICity[]>;

  constructor(private store: Store<any>, private router: Router) {
    this.favorites$ = store.pipe(select(getFavorites));
  }

  // When favorite is clicked, updates current city and redirects to home page
  onFavoriteClick(favoriteData: ICity): void {
    this.store.dispatch(actions.setCurrentCity({ city: favoriteData }));
    this.router.navigate(['/']);
  }
}
