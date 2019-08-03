import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  isCurrentCityInFavorites,
  getCurrentCity,
  AppState
} from 'src/app/state/reducers';
import * as actions from '../../state/actions';
import { IPredictions } from 'src/app/interfaces/predictions';
import { ICurrentWeather } from 'src/app/interfaces/currentWeather';
import { ICity } from 'src/app/interfaces/city';

const defaultCurrentCity: ICity = {
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
  predictions$: Observable<IPredictions>;
  currentWeather$: Observable<ICurrentWeather[]>;
  currentCity$: Observable<ICity>;
  isCurrentCityInFavorites$: Observable<boolean>;
  isCurrentWeatherLoading$: Observable<boolean>;
  isPredictionsLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    // Subscribtions to the store
    this.currentWeather$ = store.pipe(
      select((state: any) => state.weatherState.currentWeather)
    );

    this.currentCity$ = store.pipe(select(getCurrentCity));

    this.isCurrentCityInFavorites$ = store.pipe(
      select(isCurrentCityInFavorites)
    );

    this.predictions$ = store.pipe(
      select((state: any) => state.weatherState.predictions)
    );

    this.isCurrentWeatherLoading$ = store.pipe(
      select((state: any) => state.weatherState.isCurrentWeatherLoading)
    );

    this.isPredictionsLoading$ = store.pipe(
      select((state: any) => state.weatherState.isPredictionsLoading)
    );
  }

  ngOnInit() {
    // If no current city, set the current city to Tel Aviv
    this.currentCity$.subscribe(currentCity => {
      if (!currentCity) {
        this.store.dispatch(
          actions.setCurrentCity({ city: defaultCurrentCity })
        );
      }
    });
  }

  // Add '0' before digits smaller than 10
  getWeatherIconID(ID: number): string {
    return ID < 10 ? `0${ID}` : `${ID}`;
  }

  // Check the received event from the button and dispatch the correct action
  onFavoriteButtonToggled(isCityFavorite: boolean): void {
    if (isCityFavorite) {
      this.store.dispatch(actions.addToFavorites());
    } else {
      this.store.dispatch(actions.removeFromFavorites());
    }
  }
}
