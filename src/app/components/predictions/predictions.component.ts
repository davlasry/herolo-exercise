import { Component, OnInit, OnDestroy } from '@angular/core';
import { predictions } from 'src/app/mocks/5daysPredictions';
import { select, Store } from '@ngrx/store';
import * as actions from '../../state/actions';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  predictions$;
  currentWeather;
  currentCity = {
    Key: '215854',
    LocalizedName: 'Tel Aviv'
  };

  constructor(private store: Store<any>) {
    store
      .pipe(select(state => state.weatherState.currentWeather))
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

    this.predictions$ = store.pipe(
      select(state => state.weatherState.predictions)
    );
    // .subscribe(predictionsResult => {
    //   if (predictionsResult) {
    //     this.predictions = predictionsResult;
    //   }
    // });
  }

  ngOnInit() {
    this.store.dispatch(actions.getCurrentWeather({ city: this.currentCity }));
    this.store.dispatch(actions.getPredictions({ city: this.currentCity }));
  }

  getWeatherIconID(ID) {
    return ID < 10 ? `0${ID}` : ID;
  }
}
