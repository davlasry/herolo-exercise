import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Store, select } from '@ngrx/store';
import { getFavorites } from 'src/app/state/reducers';

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
}
