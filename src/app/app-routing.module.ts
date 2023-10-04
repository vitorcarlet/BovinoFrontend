import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';
import { RouteGuardService } from './services/route-guard.service';
import { DashboardModule } from './material-component/manage-ox-dashboard/dashboard.module';

const routes: Routes = [
  //dashboard = DashboardModule
  { path: '', component: HomeComponent },
  {
    path: 'bovino',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/bovino/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('./material-component/material.module').then(
            (m) => m.MaterialComponentsModule
          ),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin', 'user'],
        },
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./material-component/manage-ox-dashboard/manage-ox-dashboard.component').then((m) => m.ManageOxDashboardComponent),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin', 'user'],
        },
      },
    ],
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
