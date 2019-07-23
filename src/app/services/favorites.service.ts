import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private API_BASE_URL = 'http://dataservice.accuweather.com';
  private API_KEY = 'MVu5tD8P1Pzp0kGZfdIhuIVuqGrxtYns';

  cities = ['jerusalem'];
  constructor(private http: HttpClient) {}

  getFiveDaysPredictions(cityID) {
    return this.http
      .get<any>(
        `${this.API_BASE_URL}/forecasts/v1/daily/5day/213225?apikey=${
          this.API_KEY
        }`
      )
      .pipe(map(movies => movies.results));
  }

  getCurrentWeather(cityID) {
    return this.http
      .get<any>(
        `${this.API_BASE_URL}/currentconditions/v1/213225?apikey=${
          this.API_KEY
        }`
      )
      .pipe(map(movies => movies.results));
  }

  addCityToFavorites(cityID) {
    this.cities.push(cityID);
  }

  removeCityFromFavorites(cityID) {
    this.cities.splice(this.cities.indexOf(cityID), 1);
  }

  isCityInFavorites(cityID) {
    return this.cities.indexOf(cityID) !== -1;
  }
}
