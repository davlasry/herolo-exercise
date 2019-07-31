import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  favorites;
  favorites$;

  constructor(private store: Store<any>) {
    this.favorites$ = store.pipe(
      select(state => state.cities),
      map(featureState => featureState.favorites)
    );
  }

  ngOnInit() {}
}
