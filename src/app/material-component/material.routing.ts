import { Routes } from '@angular/router';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageOxDashboardComponent } from './manage-ox-dashboard/manage-ox-dashboard.component';
import { ManageAnimalTableComponent } from './manage-animal-table/manage-animal-table.component';
import { ManageAnimalEvolutionComponent } from './manage-animal-evolution/manage-animal-evolution.component';

export const MaterialRoutes: Routes = [
  
  {
    path:'animalEvolution',
    component:ManageAnimalEvolutionComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin','user']
    }
  },
  {
    path: 'animalTable',
    component: ManageAnimalTableComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'user']
    },
  },
  {
    path: 'oxDashboard',
    component: ManageOxDashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'user']
    },
  },
  
  {
    path: 'user',
    component: ManageUserComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
  },
];
