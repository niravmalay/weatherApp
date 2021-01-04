import { City } from '../models/city.model';
import { WeatherDetails } from '../models/weather-detail.model';
import { createReducer, on, createSelector } from '@ngrx/store';
import { WeatherActions } from '../actions';

export interface WeatherState {
    pending: boolean;
    error: string | null;
    searchKeyword: string;
    cities: Array<City>;
    city: City | null;
    weatherDetails: WeatherDetails | null
    forcast: {}
}
const initialWeatherState: WeatherState = {
    pending: false,
    error: null,
    searchKeyword: '',
    cities: [],
    city: null,
    weatherDetails: null,
    forcast: {}
}

export const weatherReducer = createReducer(initialWeatherState,
    on(WeatherActions.fetchWeatherDetails, (state, { cityName }) => ({
        ...state, pending: true, error: ''
    })),
    on(WeatherActions.fetchWeatherDetailsSuccess, (state, {weatherDetails}) => ({
        ...state,
        pending: false,
        error: '',
        weatherDetails: weatherDetails
    })),
    on(WeatherActions.fetchWeatherDetailsFailure, (state) => ({
        ...state, pending: false, error: ''
    })),

    on(WeatherActions.searchKeyword, (state, { cityName }) => ({
        ...state, pending: true, error: '', searchKeyword: cityName && cityName.toLowerCase()
    })),
    on(WeatherActions.searchKeywordSuccess, (state, {weatherDetails}) => {
        let cities = [...state.cities];
        if (cities.length < 8) {
            cities.unshift({ cityName: state.searchKeyword })
        } else if (cities.length == 8) {
            cities.unshift({ cityName: state.searchKeyword })
            cities = cities.slice(0, 8);
        }
        return {
            ...state,
            pending: false,
            error: '',
            weatherDetails: weatherDetails,
            cities: cities

        }
    }),
    on(WeatherActions.searchKeywordFailure, (state, err) => ({
        ...state,
        pending: false,
        error: err.error
    })),

    on(WeatherActions.fetchForcastSuccess, (state,  forcast) => {
        return {
            ...state,
            forcast: forcast
        }
    }),

    
    on(WeatherActions.removeLocation, (state, { cityName }) => {
        let cities = [...state.cities].filter((city) => city.cityName !== cityName) ;
        return {
            ...state,
            cities: cities
        }
    })

)


export const selectWeather = (state: any) => state.weather;

export const selectWeatherDetails = (state: WeatherState) => state.weatherDetails;

export const getWeatherDetails = createSelector(selectWeather, selectWeatherDetails);

export const selectCities = (state: WeatherState) => state.cities;

export const getCities = createSelector(selectWeather, selectCities);

export const selectError = (state: WeatherState) => state.error;

export const getError = createSelector(selectWeather, selectError);

export const selectForcast = (state: WeatherState) => state.forcast;

export const getForcast = createSelector(selectWeather, selectForcast);


