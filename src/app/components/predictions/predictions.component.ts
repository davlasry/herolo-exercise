import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as actions from '../../state/actions';
import { Observable } from 'rxjs';
import {
  getWeatherState,
  getCurrentCity,
  isCurrentCityInFavorites
} from 'src/app/state/reducers';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  predictions$;
  currentWeather;
  currentCity$: Observable<any>;
  currentCity: any = {
    Key: null
  };
  currentCityFromStore: any;
  currentCityFromStore$: any;
  isCurrentCityInFavorites$;

  constructor(private store: Store<any>) {
    store
      .pipe(select(state => state.weatherState.currentWeather))
      .subscribe(currentWeatherResult => {
        if (currentWeatherResult) {
          this.currentWeather = currentWeatherResult;
        }
      });

    this.currentCity$ = store.pipe(
      select(state => state.weatherState.currentCity)
    );

    this.isCurrentCityInFavorites$ = store.pipe(
      select(isCurrentCityInFavorites)
    );

    this.currentCityFromStore$ = store.pipe(select(getCurrentCity));
    this.currentCityFromStore$.subscribe(res => {
      console.log(res);
    });

    this.currentCity$.subscribe(currentCity => {
      console.log('currentCity:', currentCity);
      this.currentCity = currentCity;

      this.store.dispatch(
        actions.getCurrentWeather({ city: this.currentCity })
      );
      this.store.dispatch(actions.getPredictions({ city: this.currentCity }));
    });

    this.predictions$ = store.pipe(
      select(state => state.weatherState.predictions)
    );
  }

  ngOnInit() {}

  getWeatherIconID(ID) {
    return ID < 10 ? `0${ID}` : ID;
  }

  onFavoriteButtonToggled(isCityFavorite) {
    // console.log('isCityFavorite:', isCityFavorite);
    if (isCityFavorite) {
      this.store.dispatch(actions.addToFavorites(this.currentCity));
    } else {
      this.store.dispatch(actions.removeFromFavorites(this.currentCity));
    }
  }
}
