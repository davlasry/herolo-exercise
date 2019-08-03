import { Component, Input } from '@angular/core';
import { IPredictions } from 'src/app/interfaces/predictions';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent {
  @Input() predictions: IPredictions;

  getWeatherIconID(ID) {
    return ID < 10 ? `0${ID}` : ID;
  }
}
