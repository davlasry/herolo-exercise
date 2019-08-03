import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent {
  @Input() currentWeather;
  @Input() currentCity;
  @Input() isCurrentWeatherLoading;

  getWeatherIconID(ID) {
    return ID < 10 ? `0${ID}` : ID;
  }
}
