import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent {
  @Input() isCurrentCityInFavorites: boolean;
  @Output() favoriteButtonToggled = new EventEmitter();

  // Emit event with new status (add or remove to/from favorites)
  onFavoriteButtonClick(newStatus: boolean): void {
    this.favoriteButtonToggled.emit(newStatus);
  }
}
