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

  public temperatureChart: ChartConfiguration['data'] = {
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
  
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  constructor(private sensorService: SensorService){
    // sensorService.getLastSensorValues().subscribe(storedValues => {

    // })
  }

  ngOnInit(): void {
    this.sensorService.getLastSensorValues().subscribe(values => {
      this.pushMany(this.temperatureChart, values)
      this.sensorService.getRealtimeSensorValues()
      .subscribe(value => this.pushOne(this.temperatureChart, value))
    })
  }

  public pushOne(chart: ChartData, value: WeatherStationValues): void {
    console.log(value)
    chart.datasets[0].data.push(value.temperature)
    chart.labels?.push(value.instant)
    this.chart?.update();
  }

  public pushMany(chart: ChartData, values: WeatherStationValues[]): void {
    values.forEach(sensorValue => {
      chart.datasets[0].data.push(sensorValue.temperature)
      chart.labels?.push(sensorValue.instant)
    })
    
    this.chart?.update();
  }

}
