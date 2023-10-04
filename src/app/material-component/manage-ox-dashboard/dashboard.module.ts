import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutes } from './dashboard.routing';
import { ManageOxDashboardComponent } from './manage-ox-dashboard.component';
import { MaterialModule } from 'src/app/shared/material-module';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [
    MatCardModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [ManageOxDashboardComponent]
})
export class DashboardModule { }
