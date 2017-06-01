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

  // google maps zoom level
  zoom: number;
  lat: number;
  lng: number;
  markers = [];

  getMarker(): any {
    console.log(this.animals);
    this.animals.forEach((animal) => {
      this.markers.push({
        lat: animal.lat,
        lng: animal.lng,
        label: animal.name,
        draggable: true
      })
    })
  }

  getAll(): void {
    this.animalService
    .getAnimals()
    .then(animals => {this.animals = animals; this.getMarker();});
  }

  getOne(animal: Animal): void {
    this.animalService.getAnimal(animal.id).then(animal => this.animalEdited = animal);
    this.addBlock = false;
  }

  add(animal: Animal) : void {
    console.log(animal);
    this.animalService.addAnimals(animal);
    this.addBlock = false;
    delete this.animal;
    this.animal = new Animal;
  }

  update(animal: Animal) : void {
    this.animalService.updateAnimals(animal);
    delete this.animalEdited;
  }

  delete(animal: Animal) : void {
    this.animalService.deleteAnimals(animal);
  }

  showAddBlock(): void {
    this.addBlock = true;
    delete this.animalEdited;
  }
  hideAddBlock(): void {
    this.addBlock = false;
  }

  cancelEdit(): void {
    delete this.animalEdited;
  }

  ngOnInit(): void {
    this.getAll();
    // google maps zoom level
    this.zoom = 8;

    this.lat = 48.866667;
    this.lng = 2.333333;
  }
}
