import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  map,
  startWith,
  switchMap,
  debounceTime,
  tap,
  finalize,
  distinctUntilChanged
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Store } from '@ngrx/store';
import { setCurrentCity } from 'src/app/state/actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  queryStringControl = new FormControl();
  options: any[];
  filteredOptions$: Observable<string[]>;
  filteredOptions = [];
  citiesAutoComplete$: Observable<any> = null;
  isLoading = false;

  constructor(
    private favoritesService: FavoritesService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.filteredOptions$ = this.queryStringControl.valueChanges.pipe(
      tap(query => {
        if (query) {
          this.isLoading = true;
        }
      }),
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(query => {
        return this.favoritesService
          .searchCity(query)
          .pipe(finalize(() => (this.isLoading = false)));
      })
    );

    this.filteredOptions$.subscribe(res => {
      this.filteredOptions = res;
    });
  }

  displayFunction(option) {
    if (!option) {
      return '';
    }
    return option.LocalizedName;
  }

  onCitySelected(event) {
    const citySelected = event.option.value;
    if (citySelected) {
      this.store.dispatch(setCurrentCity({ city: citySelected }));
    }
  }
}
