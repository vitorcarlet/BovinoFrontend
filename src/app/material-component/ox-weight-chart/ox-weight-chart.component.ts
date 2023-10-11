import {  Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { areaChartOptions } from './areaChartOptions';

@Component({
  selector: 'app-ox-weight-chart',
  templateUrl: './ox-weight-chart.component.html',
  styleUrls: ['./ox-weight-chart.component.scss']
})
export class OxWeightChartComponent  {

  areaChart = new Chart(areaChartOptions);


  constructor() { }

  
  
}
