import { Cordinates } from './cordinate.model';
import { Cloud } from './cloud.model';
import { Main } from './main.model';
import { Sys } from './sys.model';
import { Weather } from './weather.model';
import { Wind } from './wind.model';

export interface WeatherDetails {
    coord: Cordinates,
    cloud: Cloud,
    main: Main,
    sys: Sys,
    weather: Weather,
    wind: Wind
}