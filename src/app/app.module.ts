import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { AnimalsComponent } from './animal/animals.component';
import { AnimalService } from './animal/animal.service';

@NgModule({
  declarations: [
    AppComponent,
    AnimalsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
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
