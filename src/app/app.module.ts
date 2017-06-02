import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AnimalsComponent } from './animal/animals.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { AnimalService } from './animal/animal.service';

import { VeterinariesComponent } from './veterinary/veterinaries.component';
import { VeterinaryService } from './veterinary/veterinary.service';

import { NutrimentModule } from './nutriment/nutriment.module';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    AppComponent,
    AnimalsComponent,
    AnimalDetailComponent,
    VeterinariesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NutrimentModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBKDwP32CoVsiMMZkSLEQOAJUX-T1MdM08'
    }),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/animals',
        pathMatch: 'full'
      },
      {
        path: 'animals',
        component: AnimalsComponent
      },
      {
        path: 'animal/:id',
        component: AnimalDetailComponent
      },
      {
        path: 'veterinaries',
        component: VeterinariesComponent
      },
    ])
  ],
  providers: [AnimalService, VeterinaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
