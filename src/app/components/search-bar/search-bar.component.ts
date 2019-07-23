import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap, debounceTime } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { autocompleteSearch } from 'src/app/mocks/autocomplete';

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

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.citiesAutoComplete$ = this.myControl.valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          // lookup from github
          // return this.lookup(value);
        } else {
          // if no value is present, return null
          return of(null);
        }
      })
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => {
      return option.LocalizedName.toLowerCase().includes(filterValue);
    });
  }
}
