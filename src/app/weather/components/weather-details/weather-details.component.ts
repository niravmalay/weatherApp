import { Component, OnInit } from '@angular/core';
import { WeatherState, getWeatherDetails, getForcast } from '../../reducers/weather.reducer';
import { Store } from '@ngrx/store';
import { WeatherDetails } from '../../models/weather-detail.model';
import { Subscription } from 'rxjs';
import { WeatherActions } from '../../actions';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {
  public weatherDetails: WeatherDetails | null;
  public currentWeatherDetails: any;
  public forcast : any;
  constructor(private _store$: Store<WeatherState>) {
    this.weatherDetails = null;
    this.forcast = null;
    this.s = null;
   }
  s: Subscription | null;

  ngOnInit(): void {
    this.getInitData();
  }

  public getInitData(): void {
    this.s = this._store$.select(getWeatherDetails).subscribe((weatherDetails) => {
      console.log(weatherDetails)
      this.currentWeatherDetails = weatherDetails;
    },(error) => {
      console.log(error)
    });

    this._store$.select(getForcast).subscribe((forcast) => {
      console.log(forcast)
      this.forcast = forcast;
    },(error) => {
      console.log(error)
    });
  }




  public select(cityName: string): void {
    this._store$.dispatch(WeatherActions.fetchWeatherDetails({cityName: cityName}));
    this.getInitData();

  }

  ngOnDestroy() {
    if(this.s)
    this.s.unsubscribe();
  }

  public getWeatherIcon(icon: string, size?: string){
    const iconBaseUrl= 'http://openweathermap.org/img/wn/';
    if (size) {
      return iconBaseUrl + icon + '@' + size + '.png';
    } else {
      return iconBaseUrl + icon + '.png';
    }
  }


}
