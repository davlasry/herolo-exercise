import { Component, OnInit } from '@angular/core';
import { predictions } from 'src/app/mocks/5daysPredictions';
import { currentWeather } from 'src/app/mocks/currentWeather';
import { FavoritesService } from 'src/app/services/favorites.service';
import { select, Store } from '@ngrx/store';
import * as actions from '../../state/actions';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  predictions;
  currentWeather;
  currentCity = {
    Key: '215854',
    LocalizedName: 'Tel Aviv'
  };
  isCityInFavorites;

  constructor(
    private favoritesService: FavoritesService,
    private store: Store<any>
  ) {
    store
      .pipe(
        select(state => state.weatherState.currentWeather)
        // filter(value => !!value)
      )
      .subscribe(currentWeatherResult => {
        if (currentWeatherResult) {
          this.currentWeather = currentWeatherResult;
        }
      });

    store
      .pipe(select(state => state.weatherState.currentCity))
      .subscribe(currentCityResult => {
        if (currentCityResult) {
          this.currentCity = currentCityResult;
        }
      });
  }

  ngOnInit() {
    this.store.dispatch(actions.getCurrentWeather({ city: this.currentCity }));
    // this.checkIfCityInFavorites();
    console.log('ngOnInit');
    this.store.dispatch(actions.getPredictions({ city: this.currentCity }));
    this.predictions = predictions;
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
    this.favoritesService.addCityToFavorites(this.currentCity);
    this.checkIfCityInFavorites();
    this.store.dispatch(actions.addToFavorites({ city: this.currentCity }));
  }

  removeFromFavorites() {
    console.log('Remove From favorites');
    this.favoritesService.removeCityFromFavorites(this.currentCity);
    this.checkIfCityInFavorites();
    this.store.dispatch(
      actions.removeFromFavorites({ city: this.currentCity })
    );
  }

  checkIfCityInFavorites() {
    this.isCityInFavorites = this.favoritesService.isCityInFavorites(
      this.currentCity
    );
  }
}
