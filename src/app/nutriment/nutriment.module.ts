import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NutrimentRoutingModule } from './nutriment-routing.module';
import { NutrimentComponent } from './nutriment.component';

@NgModule({
  imports: [
    CommonModule,
    NutrimentRoutingModule
  ],
  declarations: [
    NutrimentComponent
  ]
})
export class NutrimentModule { }
