import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private API_BASE_URL = 'http://dataservice.accuweather.com';
  private API_KEY = '9Qj8JUuV4jSur8p2FfosAH0yTZmByj4p';

  constructor(private http: HttpClient) {}

  getFiveDaysPredictions(cityID) {
    console.log('SERVICE getFiveDaysPredictions cityID:', cityID);
    return this.http.get<any>(
      `${this.API_BASE_URL}/forecasts/v1/daily/5day/${cityID}?apikey=${
        this.API_KEY
      }&metric=true`
    );
    // .pipe(map(movies => movies.results));
  }

  getCurrentWeather(cityID) {
    console.log('SERVICE getCurrentWeather cityID:', cityID);
    return this.http.get<any>(
      `${this.API_BASE_URL}/currentconditions/v1/${cityID}?apikey=${
        this.API_KEY
      }`
    );
  }

  searchCity(textInput) {
    console.log('textInput:', textInput);
    return this.http.get<any>(
      `${this.API_BASE_URL}/locations/v1/cities/autocomplete?apikey=${
        this.API_KEY
      }&q=${textInput}`
    );
  }
}
