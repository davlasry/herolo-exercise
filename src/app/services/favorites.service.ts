import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPredictions } from '../interfaces/predictions';
import { ICity } from '../interfaces/city';
import { ICurrentWeather } from '../interfaces/currentWeather';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private API_BASE_URL = 'https://dataservice.accuweather.com';
  private API_KEY = '9Qj8JUuV4jSur8p2FfosAH0yTZmByj4p';

  constructor(private http: HttpClient) {}

  getFiveDaysPredictions(cityKey: string): Observable<IPredictions> {
    return this.http.get<IPredictions>(
      `${this.API_BASE_URL}/forecasts/v1/daily/5day/${cityKey}?apikey=${
        this.API_KEY
      }&metric=true`
    );
  }

  getCurrentWeather(cityKey: string): Observable<ICurrentWeather[]> {
    return this.http.get<ICurrentWeather[]>(
      `${this.API_BASE_URL}/currentconditions/v1/${cityKey}?apikey=${
        this.API_KEY
      }`
    );
  }

  searchCity(textInput: string): Observable<ICity[]> {
    return this.http.get<ICity[]>(
      `${this.API_BASE_URL}/locations/v1/cities/autocomplete?apikey=${
        this.API_KEY
      }&q=${textInput}`
    );
  }
}
