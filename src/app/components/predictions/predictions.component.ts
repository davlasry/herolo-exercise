import { Component, OnInit } from '@angular/core';
import { predictions } from 'src/app/mocks/5daysPredictions';
import { currentWeather } from 'src/app/mocks/currentWeather';
import { FavoritesService } from 'src/app/services/favorites.service';
import { select, Store } from '@ngrx/store';
import * as actions from '../../state/actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  predictions;
  currentWeather;
  isCityInFavorites;
  cityID = '215854';

  constructor(
    private favoritesService: FavoritesService,
    private store: Store<any>
  ) {
    store
      .pipe(
        select(state => state.weatherState.currentWeather)
        // map(featureState => featureState)
      )
      .subscribe(currentWeatherResult => {
        if (currentWeatherResult) {
          this.currentWeather = currentWeatherResult;
          console.log('this.currentWeather:', this.currentWeather);
        }
      });
  }

  ngOnInit() {
    // this.store.dispatch(actions.getCurrentWeather({ city: this.cityID }));
    this.checkIfCityInFavorites();

    this.predictions = predictions;

    this.currentWeather = currentWeather[0];
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
    this.favoritesService.addCityToFavorites(this.cityID);
    this.checkIfCityInFavorites();
    this.store.dispatch(actions.addToFavorites({ city: this.cityID }));
  }

  removeFromFavorites() {
    console.log('Remove From favorites');
    this.favoritesService.removeCityFromFavorites(this.cityID);
    this.checkIfCityInFavorites();
    this.store.dispatch(actions.removeFromFavorites({ city: this.cityID }));
  }

  checkIfCityInFavorites() {
    this.isCityInFavorites = this.favoritesService.isCityInFavorites(
      this.cityID
    );
  }
}
