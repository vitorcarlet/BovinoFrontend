import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
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
    path: 'category',
    component: ManageCategoryComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin']
    },
  },
  {
    path: 'product',
    component: ManageProductComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'order',
    component: ManageOrderComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'user'],
    },
  },
  {
    path: 'bill',
    component: ViewBillComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'user'],
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
