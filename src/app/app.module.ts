import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AnimalsComponent } from './animal/animals.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { AnimalService } from './animal/animal.service';

import { NutrimentModule } from './nutriment/nutriment.module';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';

import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    AppComponent,
    EmptyComponent,
    AnimalsComponent,
    AnimalDetailComponent
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
      }
    ])
  ],
  providers: [AnimalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
