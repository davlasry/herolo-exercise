import { Component, OnInit } from '@angular/core';
import { predictions } from 'src/app/mocks/5daysPredictions';
import { currentWeather } from 'src/app/mocks/currentWeather';
import { FavoritesService } from 'src/app/services/favorites.service';
import { select, Store } from '@ngrx/store';
import * as actions from '../../state/actions';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  predictions;
  currentWeather;
  isCityInFavorites;
  city = 'jerusalem';

  constructor(
    private favoritesService: FavoritesService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.predictions = predictions;
    this.currentWeather = currentWeather[0];

    this.checkIfCityInFavorites();
  }

  getWeatherIconID(ID) {
    if (ID < 10) {
      return `0${ID}`;
    } else {
      return ID;
    }
  }

  addToFavorites() {
    console.log('Add to favorites');
    this.favoritesService.addCityToFavorites(this.city);
    this.checkIfCityInFavorites();
    this.store.dispatch(actions.addToFavorites({ city: this.city }));
  }

  removeFromFavorites() {
    console.log('Remove From favorites');
    this.favoritesService.removeCityFromFavorites(this.city);
    this.checkIfCityInFavorites();
    this.store.dispatch(actions.removeFromFavorites({ city: this.city }));
  }

  checkIfCityInFavorites() {
    this.isCityInFavorites = this.favoritesService.isCityInFavorites(this.city);
  }
}
