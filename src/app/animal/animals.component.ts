import { Component, Input, OnInit } from '@angular/core';
import { Animal } from './animal';
import { AnimalService } from './animal.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  animals: Animal[];
  animalEdited: Animal;

  @Input() name: Animal;
  @Input() id: Animal;

  constructor(private animalService: AnimalService) {}

  getAll(): void {
    this.animalService.getAnimals().then(animals => this.animals = animals);
  }

  getOne(id: number): void {
    this.animalService.getAnimal(id).then(animal => this.animalEdited = animal);
  }

  add(name: string) : void {
    this.animalService.addAnimals(name)
  }

  update(id: number, name: string) : void {
    this.animalService.updateAnimals(id, name);
  }

  delete(id: number) : void {
    this.animalService.deleteAnimals(id);
  }

  ngOnInit(): void {
    this.animalService.hydrateBdd();
    this.animalService.setStoredAnimals();
    this.getAll();
  }
}
