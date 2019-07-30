import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { PredictionsComponent } from './components/predictions/predictions.component';

const routes: Routes = [
  {
    path: '',
    component: PredictionsComponent
  },
  {
    path: 'favorites',
    component: FavoritesListComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
