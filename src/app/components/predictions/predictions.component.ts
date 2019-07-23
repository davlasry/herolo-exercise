import { Component, OnInit } from '@angular/core';
import { predictions } from 'src/app/mocks/5daysPredictions';
import { currentWeather } from 'src/app/mocks/currentWeather';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  predictions;
  currentWeather;

  constructor() {}

  ngOnInit() {
    this.predictions = predictions;
    this.currentWeather = currentWeather[0];
  }
}
