import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductComponent } from './dialog/product/product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageOxDashboardComponent } from './manage-ox-dashboard/manage-ox-dashboard.component';
import { AnimalTableComponent } from './dialog/animal-table/animal-table.component';
import { AnimalCardComponent } from './animal-card/animal-card.component';
import { ManageAnimalTableComponent } from './manage-animal-table/manage-animal-table.component';
import { DialogAnimalCardComponent } from './dialog/dialog-animal-card/dialog-animal-card.component';
import { ManageAnimalEvolutionComponent } from './manage-animal-evolution/manage-animal-evolution.component';
import { YouAreNotAllowedComponent } from './you-are-not-allowed/you-are-not-allowed.component';
import { AnimalEvolutionComponent } from './dialog/animal-evolution/animal-evolution.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ManageProductComponent,
    ProductComponent,
    ManageOrderComponent,
    ViewBillComponent,
    ManageUserComponent,
    ManageOxDashboardComponent,
    AnimalTableComponent,
    AnimalCardComponent,
    ManageAnimalTableComponent,
    DialogAnimalCardComponent,
    ManageAnimalEvolutionComponent,
    YouAreNotAllowedComponent,
    AnimalEvolutionComponent
  ]
})
export class MaterialComponentsModule {}
