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

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';
  
  @ViewChild('temperatureChart', {read: BaseChartDirective}) 
  temperatureChart?: BaseChartDirective;

  @ViewChild('humidityChart', {read: BaseChartDirective}) 
  humidityChart?: BaseChartDirective;

  constructor(private sensorService: SensorService){
    // sensorService.getLastSensorValues().subscribe(storedValues => {

    // })
  }

  ngOnInit(): void {
    this.sensorService.getLastSensorValues().subscribe(values => {
      this.pushMany(this.temperatureChartData, values, (value: WeatherStationValues) => value.temperature)
      this.temperatureChart?.update()

      this.pushMany(this.humidityChartData, values, (value: WeatherStationValues) => value.humidity)
      this.humidityChart?.update()

      this.sensorService.getRealtimeSensorValues().subscribe(value => {
        this.pushOne(this.temperatureChartData, value.temperature, value.instant)
        this.temperatureChart?.update()

        this.pushOne(this.humidityChartData, value.humidity, value.instant)
        this.humidityChart?.update()
      })
    })
  }

  public pushOne(chart: ChartData, value: any, instant: Date): void {
    console.log(value)
    chart.datasets[0].data.push(value)
    chart.labels?.push(instant)
  }

  public pushMany(chart: ChartData, values: WeatherStationValues[], fn: (val: WeatherStationValues) => number): void {
    values.forEach(sensorValue => {
      chart.datasets[0].data.push(fn(sensorValue))
      chart.labels?.push(sensorValue.instant)
    })
  }

}
