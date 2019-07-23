import { Component, OnInit } from '@angular/core';
import { predictions } from 'src/app/mocks/5daysPredictions';
import { currentWeather } from 'src/app/mocks/currentWeather';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  predictions;
  currentWeather;
  isCityInFavorites;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.predictions = predictions;
    this.currentWeather = currentWeather[0];

    // this.isCityInFavorites();
  }

  addToFavorites() {
    console.log('Add to favorites');
  }

  removeFromFavorites() {
    console.log('Remove From favorites');
  }
}
