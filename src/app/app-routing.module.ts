import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmptyComponent } from './empty/empty.component';

const routes: Routes = []

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
