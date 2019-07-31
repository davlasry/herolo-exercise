import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap, debounceTime } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { autocompleteSearch } from 'src/app/mocks/autocomplete';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Store } from '@ngrx/store';
import {
  getCurrentWeather,
  setCurrentWeather,
  getPredictions
} from 'src/app/state/actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  queryStringControl = new FormControl();
  options: any[] = autocompleteSearch;
  filteredOptions: Observable<string[]>;
  citiesAutoComplete$: Observable<any> = null;

  constructor(
    private favoritesService: FavoritesService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.filteredOptions = this.queryStringControl.valueChanges.pipe(
      // delay emits
      debounceTime(600),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(query => this.favoritesService.searchCity(query))
    );

    // initialize queryString formcontrol
    // this.queryStringControl.setValue("");

    this.options = autocompleteSearch;
  }

  displayFunction(option) {
    if (!option) {
      return '';
    }
    return option.LocalizedName;
  }

  onCitySelected(event) {
    const citySelected = event.option.value;
    this.store.dispatch(getCurrentWeather({ city: citySelected }));
    this.store.dispatch(getPredictions({ city: citySelected }));
  }
}
