import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NutrimentComponent } from './nutriment.component';

// Définit la liste des routes pour le module Nutriment
const routes: Routes = [
  // Route menant à la liste des nutriments
  { path: 'nutriment', component: NutrimentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NutrimentRoutingModule { }
