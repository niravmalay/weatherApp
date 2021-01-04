import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherState, getCities, getError } from '../../reducers/weather.reducer';
import { WeatherActions } from '../../actions';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  public cities: Array<City>;
  public searchKey : string;
  public errorMsg : string;
  constructor(private _store$: Store<WeatherState>) { 
    this.cities = [];
    this.searchKey = '';
    this.errorMsg = '';
  }

  ngOnInit(): void {
    this._store$.select(getCities).subscribe((cities) => {
      console.log(cities)
      this.cities = cities;
    },(error) => {
      console.log(error)
    });

    this._store$.select(getError).subscribe((error) => {
      console.log(error)
      this.errorMsg = <string>error;
    },(error) => {
      console.log(error)
    });
    
  }

  public add(searchKey: string): void {
    if(!searchKey) {
      return;
    }
    if(this.cities.map((city) => city.cityName).includes(searchKey.toLowerCase())){
      return;
    }
    this._store$.dispatch(WeatherActions.searchKeyword({cityName: searchKey}))
  }

  public select(cityName: string): void {
    this._store$.dispatch(WeatherActions.fetchWeatherDetails({cityName: cityName}))
  }

  public remove(cityName: string): void {
    this._store$.dispatch(WeatherActions.removeLocation({cityName: cityName}))
  }


}
