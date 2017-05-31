import { Component, OnInit } from '@angular/core';
import { AnimalService } from './animal/animal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Gestionnaire d\'animaux';

  constructor(private animalService: AnimalService) {}

  ngOnInit():void {
    this.animalService.hydrateBdd();
    this.animalService.setStoredAnimals();
  }
}
