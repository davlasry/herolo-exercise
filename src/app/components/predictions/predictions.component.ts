import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as actions from '../../state/actions';
import {
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
  currentWeather$: Observable<any>;
  currentCity$: Observable<any>;
  currentCityFromStore: any;
  currentCityFromStore$: any;
  isCurrentCityInFavorites$;
  isCurrentWeatherLoading$: Observable<boolean>;
  isPredictionsLoading$: Observable<boolean>;
  defaultCurrentCity = {
    Key: '215854',
    LocalizedName: 'Tel Aviv',
    Country: {
      LocalizedName: 'Israel'
    }
  };

  constructor(private store: Store<any>) {
    this.currentWeather$ = store.pipe(
      select(state => state.weatherState.currentWeather)
    );

    this.currentCity$ = store.pipe(select(getCurrentCity));

    this.isCurrentCityInFavorites$ = store.pipe(
      select(isCurrentCityInFavorites)
    );

    this.predictions$ = store.pipe(
      select(state => state.weatherState.predictions)
    );

    this.isCurrentWeatherLoading$ = store.pipe(
      select(state => state.weatherState.isCurrentWeatherLoading)
    );

    this.isPredictionsLoading$ = store.pipe(
      select(state => state.weatherState.isPredictionsLoading)
    );
  }

  ngOnInit() {
    this.currentCity$.subscribe(currentCity => {
      if (!currentCity) {
        this.store.dispatch(
          actions.setCurrentCity({ city: this.defaultCurrentCity })
        );
      }
    });
  }

  getWeatherIconID(ID) {
    return ID < 10 ? `0${ID}` : ID;
  }

  onFavoriteButtonToggled(isCityFavorite) {
    if (isCityFavorite) {
      this.store.dispatch(actions.addToFavorites());
    } else {
      this.store.dispatch(actions.removeFromFavorites());
    }
  }
}
