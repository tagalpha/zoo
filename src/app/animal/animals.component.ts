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
  addBlock = false;

  animal = new Animal;

  constructor(private animalService: AnimalService) {}

  getAll(): void {
    this.animalService.getAnimals().then(animals => this.animals = animals);
  }

  getOne(id: number): void {
    this.animalService.getAnimal(id).then(animal => this.animalEdited = animal);
  }

  add(animal: Animal) : void {
    console.log(animal);
    this.animalService.addAnimals(animal);
    //this.name = '';
  }

  update(animal: Animal) : void {
    this.animalService.updateAnimals(animal);
    delete this.animalEdited;
  }

  delete() : void {
    this.animalService.deleteAnimals(this.animalEdited);
    delete this.animalEdited;
  }

  showAddBlock(): void {
    this.addBlock = true;
  }
  hideAddBlock(): void {
    this.addBlock = false;
  }

  cancelEdit(): void {
    delete this.animalEdited;
  }

  ngOnInit(): void {
    this.getAll();
  }
}
