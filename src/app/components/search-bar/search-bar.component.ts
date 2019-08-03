import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
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
import { ICity } from 'src/app/interfaces/city';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  queryStringControl = new FormControl();
  options: ICity[];
  filteredOptions$: Observable<ICity[]>;
  filteredOptions = [];
  isLoading = false;

  constructor(
    private favoritesService: FavoritesService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    // On each input change, receive the options for autocompletion
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

    this.filteredOptions$.subscribe((res: ICity[]) => {
      this.filteredOptions = res;
    });
  }

  // Returns the name of the city from the city object
  displayFunction(option: ICity | null): string {
    if (!option) {
      return '';
    }
    return option.LocalizedName;
  }

  // When option is clicked in autocomplete, updates the current city in the store
  onCitySelected(event): void {
    const citySelected = event.option.value;
    if (citySelected) {
      this.store.dispatch(setCurrentCity({ city: citySelected }));
    }
  }
}
