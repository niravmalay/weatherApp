import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherDetails } from '../models/weather-detail.model';

const API_KEY = '6f1be6f68d8032827ec96c06bc1fd1e8';

@Injectable()
export class WeatherService {

    constructor(private http: HttpClient) { }

    public getWeatherDetails(cityName: string): Observable<WeatherDetails> {
        return this.http.get<WeatherDetails>(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
    }

    public getForcast(lat: number, long: number): Observable<any> {
        const date = new Date().getTime();
        return this.http.get<any>(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly&appid=${API_KEY}`)
    }


}