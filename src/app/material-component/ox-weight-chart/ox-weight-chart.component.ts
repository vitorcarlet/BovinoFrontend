import {  Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { generateChartOptions } from './areaChartOptions';
import { MonthlyOxWeightService } from 'src/app/services/monthly-ox-weight.service';
import { Options } from 'highcharts';

@Component({
  selector: 'app-ox-weight-chart',
  templateUrl: './ox-weight-chart.component.html',
  styleUrls: ['./ox-weight-chart.component.scss']
})
export class OxWeightChartComponent implements OnInit {
  chartConfigured: Options;
  charUpdated:Chart

  async ngOnInit(){
    const chartConfigured1 = await generateChartOptions();

    const areaChart = new Chart(chartConfigured1);
    this.charUpdated = areaChart;
  }

  
  


  constructor() { }

}