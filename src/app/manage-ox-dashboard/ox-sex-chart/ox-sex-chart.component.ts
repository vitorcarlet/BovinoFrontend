import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { donutChartOptions } from './donutChartOptions';

@Component({
  selector: 'app-ox-sex-chart',
  templateUrl: './ox-sex-chart.component.html',
  styleUrls: ['./ox-sex-chart.component.scss']
})
export class OxSexChartComponent implements OnInit {


  donutChart = new Chart(donutChartOptions)
  constructor() { }

  ngOnInit(): void {
  }

}
