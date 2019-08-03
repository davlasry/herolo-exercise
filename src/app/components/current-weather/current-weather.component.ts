import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit, OnChanges {
  @Input() currentWeather;
  @Input() currentCity;
  @Input() isCurrentWeatherLoading;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes) {
    console.log('changes:', changes);
  }

  getWeatherIconID(ID) {
    return ID < 10 ? `0${ID}` : ID;
  }
}
