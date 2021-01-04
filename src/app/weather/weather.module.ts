import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityListComponent } from './components/city-list/city-list.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { WeatherComponent } from './weather.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { MaterialModule } from '../material';
import { WeatherService } from './services/weather-service';
import { StoreModule } from '@ngrx/store';
import { weatherReducer } from './reducers/weather.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffect } from './effects/weather.effect';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CityListComponent, WeatherDetailsComponent, WeatherComponent],
  imports: [
    CommonModule,
    MaterialModule,
    WeatherRoutingModule,
    FormsModule,
    StoreModule.forFeature('weather', weatherReducer),
    EffectsModule.forFeature([WeatherEffect])
  ],
  providers: [ WeatherService ]
})
export class WeatherModule { }
