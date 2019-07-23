import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  favorites;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoritesService.favoriteCities.subscribe(cities => {
      console.log('cities:', cities);
      this.favorites = cities;
    });
  }
}
