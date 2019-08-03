import { Component, Input } from '@angular/core';
import { ICity } from 'src/app/interfaces/city';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  @Input() favoriteData: ICity;
}
