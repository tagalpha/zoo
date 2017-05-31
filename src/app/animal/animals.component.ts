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

  @Input() name: string;
  @Input() id: string|number;

  constructor(private animalService: AnimalService) {}

  getAll(): void {
    this.animalService.getAnimals().then(animals => this.animals = animals);
  }

  getOne(id: number): void {
    this.animalService.getAnimal(id).then(animal => this.animalEdited = animal);
  }

  add(name: string) : void {
    this.animalService.addAnimals(name)
    this.name = '';
  }

  update(id: number, name: string) : void {
    this.animalService.updateAnimals(id, name);
  }

  delete() : void {
    this.animalService.deleteAnimals(this.animalEdited);
    delete this.animalEdited;
  }

  ngOnInit(): void {
    this.animalService.hydrateBdd();
    this.animalService.setStoredAnimals();
    this.getAll();
  }
}
