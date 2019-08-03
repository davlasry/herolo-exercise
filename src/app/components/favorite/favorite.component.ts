import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  @Input() favoriteData;
  @Output() favoriteClicked = new EventEmitter();

  onWatchWeatherLink() {
    this.favoriteClicked.emit(this.favoriteData);
  }
}
