import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private API_BASE_URL = 'http://dataservice.accuweather.com';
  private API_KEY = 'MVu5tD8P1Pzp0kGZfdIhuIVuqGrxtYns';

  private favoriteCitiesSource = new BehaviorSubject<any[]>([]);
  favoriteCities = this.favoriteCitiesSource.asObservable();

  private favoriteCitiesArray = [];

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

  searchCity(textInput) {
    console.log('textInput:', textInput);
    return this.http.get<any>(
      `${this.API_BASE_URL}/locations/v1/cities/autocomplete?apikey=${
        this.API_KEY
      }&q=${textInput}`
    );
  }

  // getFavorites() {
  //   return this.favoriteCities;
  // }

  addCityToFavorites(cityID) {
    this.favoriteCitiesArray.push(cityID);
    this.favoriteCitiesSource.next(this.favoriteCitiesArray);
  }

  removeCityFromFavorites(cityID) {
    this.favoriteCitiesArray.splice(
      this.favoriteCitiesArray.indexOf(cityID),
      1
    );
    this.favoriteCitiesSource.next(this.favoriteCitiesArray);
  }

  isCityInFavorites(cityID) {
    return this.favoriteCitiesArray.indexOf(cityID) !== -1;
  }
}
