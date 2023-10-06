import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { donutChartOptions } from './donutChartOptions';
import { areaChartOptions } from './areaChartOptions';

@Component({
  selector: 'app-ox-weight-chart',
  templateUrl: './ox-weight-chart.component.html',
  styleUrls: ['./ox-weight-chart.component.scss']
})
export class OxWeightChartComponent  {

  donutChart = new Chart(donutChartOptions);
  areaChart = new Chart(areaChartOptions);

  constructor() { }

  
  
}
