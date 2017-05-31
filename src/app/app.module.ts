import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AnimalsComponent } from './animal/animals.component';
import { AnimalService } from './animal/animal.service';

import { NutrimentModule } from './nutriment/nutriment.module';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [
    AppComponent,
    EmptyComponent,
    AnimalsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NutrimentModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/animals',
        pathMatch: 'full'
      },
      {
        path: 'animals',
        component: AnimalsComponent
      }
    ])
  ],
  providers: [AnimalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
