import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutes } from './dashboard.routing';
import { ManageOxDashboardComponent } from './manage-ox-dashboard.component';
import { MaterialModule } from 'src/app/shared/material-module';
import { MatCardModule } from '@angular/material/card';
import { OxWeightChartComponent } from '../material-component/ox-weight-chart/ox-weight-chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular-highcharts';


@NgModule({
  
  imports: [
    MatCardModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(DashboardRoutes),
    BrowserModule,
    ChartModule
  ],
  declarations: [ManageOxDashboardComponent,OxWeightChartComponent]
})
export class DashboardModule { }
