import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  isCurrentCityInFavorites,
  getCurrentCity
} from 'src/app/state/reducers';
import * as actions from '../../state/actions';

const defaultCurrentCity = {
  Key: '215854',
  LocalizedName: 'Tel Aviv',
  Country: {
    LocalizedName: 'Israel'
  }
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  predictions$;
  currentWeather$: Observable<any>;
  currentCity$: Observable<any>;
  currentCityFromStore: any;
  currentCityFromStore$: any;
  isCurrentCityInFavorites$;
  isCurrentWeatherLoading$: Observable<boolean>;
  isPredictionsLoading$: Observable<boolean>;

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
          actions.setCurrentCity({ city: defaultCurrentCity })
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
