import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getNumberOfFavorites } from './state/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  numberOfFavorites$;

  constructor(store: Store<any>) {
    this.numberOfFavorites$ = store.select(getNumberOfFavorites);
  }
}
