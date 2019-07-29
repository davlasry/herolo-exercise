import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap, debounceTime } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { autocompleteSearch } from 'src/app/mocks/autocomplete';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  myControl = new FormControl();
  options: any[] = autocompleteSearch;
  filteredOptions: Observable<string[]>;
  citiesAutoComplete$: Observable<any> = null;

  constructor(
    private favoritesService: FavoritesService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   // delay emits
    //   debounceTime(600),
    //   // use switch map so as to cancel previous subscribed events, before creating new once
    //   switchMap(query => this.favoritesService.searchCity(query))
    // );

    this.options = autocompleteSearch;
  }

  onCitySelected(event) {
    const citySelected = event.option.value;
    this.store.dispatch({ type: '[Weather] Get City Predictions' });
    console.log('citySelected:', citySelected);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => {
      return option.LocalizedName.toLowerCase().includes(filterValue);
    });
  }
}
