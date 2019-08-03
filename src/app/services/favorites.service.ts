import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private API_BASE_URL = 'https://dataservice.accuweather.com';
  private API_KEY = '9Qj8JUuV4jSur8p2FfosAH0yTZmByj4p';

  constructor(private http: HttpClient) {}

  getFiveDaysPredictions(cityID) {
    return this.http.get<any>(
      `${this.API_BASE_URL}/forecasts/v1/daily/5day/${cityID}?apikey=${
        this.API_KEY
      }&metric=true`
    );
  }

  getCurrentWeather(cityID) {
    return this.http.get<any>(
      `${this.API_BASE_URL}/currentconditions/v1/${cityID}?apikey=${
        this.API_KEY
      }`
    );
  }

  searchCity(textInput) {
    return this.http.get<any>(
      `${this.API_BASE_URL}/locations/v1/cities/autocomplete?apikey=${
        this.API_KEY
      }&q=${textInput}`
    );
  }
}
