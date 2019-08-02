import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  @Input() favoriteData;
  @Output() favoriteClicked = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onWatchWeatherLink() {
    this.favoriteClicked.emit(this.favoriteData);
  }
}
