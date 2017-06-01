import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NutrimentRoutingModule } from './nutriment-routing.module';
import { NutrimentComponent } from './nutriment.component';

@NgModule({
  imports: [
    CommonModule,
    NutrimentRoutingModule,
    FormsModule
  ],
  declarations: [
    NutrimentComponent
  ]
})
export class NutrimentModule { }
