import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from, Observable, Observer } from 'rxjs';
import * as signalR from "@microsoft/signalr";

import { WeatherStationValues } from '../models/weather.station.values';
@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private hubConnection: signalR.HubConnection
  
  constructor(private http: HttpClient) { 
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost/sensor`)
      .build();

      this.hubConnection.start()
  }

  getLastSensorValues(): Observable<WeatherStationValues[]> {
    return this.http.get<WeatherStationValues[]>("/api/weather-station")
  }

  getRealtimeSensorValues(): Observable<WeatherStationValues> {
    return new Observable((observer: Observer<WeatherStationValues>) => {
      this.hubConnection.on("sensor-values", message => {
        observer.next(message);
      })
    })
  }
}
