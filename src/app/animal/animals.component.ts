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

  getMarker(): void {
    this.animals.forEach((animal) => {
      this.markers.push({
        id: animal.id,
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
    animal.id = Math.floor((1 + Math.random()) * 0x10000);
    this.animalService.addAnimals(animal);
    this.addBlock = false;
    delete this.animal;
    this.animal = new Animal;
    this.markers.push({
      id: animal.id,
      lat: animal.lat,
      lng: animal.lng,
      label: animal.name,
      draggable: true
    })
  }

  update(animal: Animal) : void {
    this.animalService.updateAnimals(animal);
    delete this.animalEdited;
    var markerToUpdate = this.markers.filter((marker) => {
      return marker.id == animal.id;
    });
    markerToUpdate[0].lat = animal.lat;
    markerToUpdate[0].lng = animal.lng;
    markerToUpdate[0].label = animal.name;
  }

  delete(animal: Animal) : void {
    this.animalService.deleteAnimals(animal);
    var markerToDelete = this.markers.filter((marker) => {
      return marker.id == animal.id;
    });
    const index = this.markers.indexOf(markerToDelete[0]);
    if(-1 < index) {
      this.markers.splice(index,  1);
    }
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
    this.zoom = 11;

    this.lat = 48.8641500;
    this.lng = 2.4832200;
  }
}
