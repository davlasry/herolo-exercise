import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { environment } from './../environments/environment';

import { AppRoutingModule } from './app-routing.module';

// Angular Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// NgRx modules
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

import { reducer } from './state/reducers';
import { WeatherEffects } from './state/effects';
import { FavoriteButtonComponent } from './components/favorite-button/favorite-button.component';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesListComponent,
    FavoriteComponent,
    HeaderComponent,
    PredictionsComponent,
    SearchBarComponent,
    FavoriteButtonComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ weatherState: reducer }),
    EffectsModule.forRoot([WeatherEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
