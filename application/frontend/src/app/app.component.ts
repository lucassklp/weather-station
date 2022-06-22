import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { WeatherStationValues } from './models/weather.station.values';
import { SensorService } from './services/sensor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public temperatureChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ ],
        label: 'Temperatura',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ ]
  };

  public humidityChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ ],
        label: 'Humidade',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ ]
  };

  public pressureChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ ],
        label: 'Pressão',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ ]
  };

  public uvChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ ],
        label: 'UV',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ ]
  };

  public anenometerChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ ],
        label: 'Anenômetro',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ ]
  };

  public waterSensorChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ ],
        label: 'Sensor de água',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ ]
  };

  public rssiChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ ],
        label: 'Received Signal Strength Information (RSSI)',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      y:{
          position: 'left',
        },
    }
  };

  public lineChartType: ChartType = 'line';
  
  @ViewChild('temperatureChart', {read: BaseChartDirective}) 
  temperatureChart?: BaseChartDirective;

  @ViewChild('humidityChart', {read: BaseChartDirective}) 
  humidityChart?: BaseChartDirective;

  @ViewChild('pressureChart', {read: BaseChartDirective}) 
  pressureChart?: BaseChartDirective;

  @ViewChild('uvChart', {read: BaseChartDirective}) 
  uvChart?: BaseChartDirective;

  @ViewChild('anenometerChart', {read: BaseChartDirective}) 
  anenometerChart?: BaseChartDirective;

  @ViewChild('waterSensorChart', {read: BaseChartDirective}) 
  waterSensorChart?: BaseChartDirective;

  @ViewChild('rssiChart', {read: BaseChartDirective}) 
  rssiChart?: BaseChartDirective;

  constructor(private sensorService: SensorService){

  }

  ngOnInit(): void {
    this.sensorService.getLastSensorValues().subscribe(values => {
      this.pushMany(this.temperatureChartData, values, value => value.temperature)
      this.temperatureChart?.update()

      this.pushMany(this.humidityChartData, values, value => value.humidity)
      this.humidityChart?.update()

      this.pushMany(this.pressureChartData, values, value => value.pressure)
      this.pressureChart?.update()

      this.pushMany(this.uvChartData, values, value => value.uv)
      this.uvChart?.update()

      this.pushMany(this.anenometerChartData, values, value => value.anemometer)
      this.anenometerChart?.update()

      this.pushMany(this.waterSensorChartData, values, value => value.waterSensor)
      this.waterSensorChart?.update()

      this.pushMany(this.rssiChartData, values, value => value.rssi)
      this.rssiChart?.update()

      this.sensorService.getRealtimeSensorValues().subscribe(value => {
        this.pushOne(this.temperatureChartData, value.temperature, new Date(value.instant))
        this.temperatureChart?.update()

        this.pushOne(this.humidityChartData, value.humidity, new Date(value.instant))
        this.humidityChart?.update()

        this.pushOne(this.pressureChartData, value.pressure, new Date(value.instant))
        this.pressureChart?.update()

        this.pushOne(this.uvChartData, value.uv, new Date(value.instant))
        this.uvChart?.update()

        this.pushOne(this.anenometerChartData, value.anemometer, new Date(value.instant))
        this.anenometerChart?.update()

        this.pushOne(this.waterSensorChartData, value.waterSensor, new Date(value.instant))
        this.waterSensorChart?.update()

        this.pushOne(this.rssiChartData, value.rssi, new Date(value.instant))
        this.rssiChart?.update()
      })
    })
  }

  public pushOne(chart: ChartData, value: any, date: Date): void {
    chart.datasets[0].data.push(value)
    chart.labels?.push(`${date.toLocaleDateString("pt-BR")} ${date.toLocaleTimeString("pt-BR")}`)
  }

  public pushMany(chart: ChartData, values: WeatherStationValues[], fn: (val: WeatherStationValues) => number): void {
    values.forEach(sensorValue => {
      chart.datasets[0].data.push(fn(sensorValue))
      const date = new Date(sensorValue.instant);
      chart.labels?.push(`${date.toLocaleDateString("pt-BR")} ${date.toLocaleTimeString("pt-BR")}`)
    })
  }
}
