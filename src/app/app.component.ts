import { Component, OnInit } from '@angular/core';
import { AnimalService } from './animal/animal.service';
import { VeterinaryService } from './veterinary/veterinary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Animal Manager';

  constructor(private animalService: AnimalService, private veterinaryService: VeterinaryService) {}

  ngOnInit():void {
    this.animalService.hydrateBdd();
    this.animalService.setStoredAnimals();
    this.veterinaryService.hydrateBdd();
    this.veterinaryService.setStoredVeterinaries();
  }
}
