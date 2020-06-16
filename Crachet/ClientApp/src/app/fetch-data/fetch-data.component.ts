import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  selectedForecast?: WeatherForecast;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {

    this.getForecast();
  }

  getForecast() {
    this.http.get<WeatherForecast[]>(this.baseUrl + 'weatherforecast').subscribe(
      result => {
        this.forecasts = result;
        this.forecasts.forEach(forecast => {
          const forecastDate = new Date(forecast.date);
          forecast.dateFormattedString = forecastDate.toLocaleString();

        });

       /* for (const forecast of result) {
          const forecastDate = new Date(forecast.date);
          forecast.dateFormattedString = forecastDate.toLocaleString();
        }*/

    }, error => console.error(error));
  }

  selectRow(selectedRowNumber: number) {
    this.selectedForecast = this.forecasts[selectedRowNumber];
  }

}

interface WeatherForecast {
  date: string; // ISO date string, not user-friendly
  dateFormattedString: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
