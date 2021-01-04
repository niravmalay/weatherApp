import { createAction, props } from '@ngrx/store';
import { WeatherDetails } from '../models/weather-detail.model';


export const fetchWeatherDetails = createAction(
    '[WEATHER] Fetch Details',
    props<{cityName:string}>()
);

export const fetchWeatherDetailsSuccess = createAction(
    '[WEATHER] Fetch Details Success',
    props<{weatherDetails:WeatherDetails}>()
);

export const fetchWeatherDetailsFailure = createAction(
    '[WEATHER] Fetch Details Failure',
    props<{error:any}>()
);

export const fetchForcastSuccess = createAction(
    '[WEATHER] Fetch Forcast Success',
    props<{forcast:any}>()
);

export const fetchForcastFailure = createAction(
    '[WEATHER] Fetch Forcast Failure',
    props<{error:any}>()
);

export const searchKeyword = createAction(
    '[WEATHER] Search Keyword',
    props<{cityName:string}>()
);

export const searchKeywordSuccess = createAction(
    '[WEATHER] Search Keyword Success',
    props<{weatherDetails:WeatherDetails}>()
);

export const searchKeywordFailure = createAction(
    '[WEATHER] Search Keyword Failure',
    props<{error:string}>()
);

export const removeLocation = createAction(
    '[WEATHER] Remove Location',
    props<{cityName:string}>()
);

export const removeLocationSuccess = createAction(
    '[WEATHER] Remove Location Success',
    props<{cityName:string}>()
);

export const removeLocationFailure = createAction(
    '[WEATHER] Remove Location Failure',
    props<{error:string}>()
);



