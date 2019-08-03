import { Component, Input } from '@angular/core';
import { ICurrentWeather } from 'src/app/interfaces/currentWeather';
import { ICity } from 'src/app/interfaces/city';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent {
  @Input() currentWeather: ICurrentWeather[];
  @Input() currentCity: ICity;
  @Input() isCurrentWeatherLoading: boolean;

  getWeatherIconID(ID) {
    return ID < 10 ? `0${ID}` : ID;
  }
}
