import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { FavoritesService } from '../services/favorites.service';

// @Injectable()
// export class WeatherEffects {
//   randomAdd = createEffect(() =>
//     this.actions.pipe(
//       ofType(randomAdd),
//       mapToAction({
//         project: () =>
//           generateValue().pipe(map(value => add({ payload: { value } }))),
//         error: message => logInfo(message)
//       })
//     )
//   );

//   constructor(
//     private actions: Actions,
//     private favoritesService: FavoritesService
//   ) {}
// }
