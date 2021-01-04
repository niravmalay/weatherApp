import { Observable, of } from 'rxjs';
import { WeatherDetails } from '../models/weather-detail.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { WeatherState } from '../reducers/weather.reducer';
import { WeatherActions } from '../actions';
import { switchMap, catchError, map, filter } from 'rxjs/operators';
import { WeatherService } from '../services/weather-service';

@Injectable()

export class WeatherEffect {

    constructor(private actions$ : Actions, private weatherService: WeatherService, private store$: Store<WeatherState>) { 

    }

    fetch$ = createEffect(() => 
        this.actions$.pipe(
            ofType(WeatherActions.fetchWeatherDetails),
            map((action) => action.cityName),
            filter((cityName) => !!cityName),
            switchMap((cityName: string) => {
                return this.weatherService.getWeatherDetails(cityName)
                .pipe(
                    map((weatherDetails: WeatherDetails) => WeatherActions.fetchWeatherDetailsSuccess({weatherDetails})), 
                    catchError((error) => of(WeatherActions.fetchWeatherDetailsFailure({error})) )
                )
            })
        )
    )

    forcast$ = createEffect(() => 
        this.actions$.pipe(
            ofType(WeatherActions.fetchWeatherDetailsSuccess, WeatherActions.searchKeywordSuccess),
            map((action) => action && action.weatherDetails && action.weatherDetails.coord),
            switchMap((coord) => {
                return this.weatherService.getForcast(coord.lat, coord.lon)
                .pipe(
                    map((forcast: any) => WeatherActions.fetchForcastSuccess(forcast)), 
                    catchError((error) => of(WeatherActions.fetchForcastFailure({error})) )
                )
            })
        )
    )

    search$ = createEffect(() => 
        this.actions$.pipe(
            ofType(WeatherActions.searchKeyword),
            map((action) => action.cityName),
            filter((cityName) => !!cityName),
            switchMap((cityName: string) => {
                return this.weatherService.getWeatherDetails(cityName)
                .pipe(
                    map((weatherDetails: WeatherDetails) => WeatherActions.searchKeywordSuccess({weatherDetails})), 
                    catchError((error) => of(WeatherActions.searchKeywordFailure({error: error.error.message})) )
                )
            })
        )
    )

    
}