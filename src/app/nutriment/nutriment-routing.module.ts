import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NutrimentComponent } from './nutriment.component';

const routes: Routes = [
  { path: 'nutriment', component: NutrimentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NutrimentRoutingModule { }
