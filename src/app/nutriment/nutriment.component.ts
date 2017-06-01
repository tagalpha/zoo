import { Component, OnInit } from '@angular/core';
import { NutrimentService } from './nutriment.service';
import { Nutriment } from './nutriment';

import { Animal } from './../animal/animal';
import { AnimalService } from './../animal/animal.service';

@Component({
  selector: 'app-nutriment',
  templateUrl: './nutriment.component.html',
  styleUrls: ['./nutriment.component.css'],
  providers: [NutrimentService]
})

export class NutrimentComponent implements OnInit {
  animals: Animal[];
  nutriments: Nutriment[];
  animalSelected: Animal;

  constructor(private nutrimentService: NutrimentService, private animalService: AnimalService) {}

  ngOnInit() {
    this.nutrimentService.getServices().then(response => this.nutriments = response);
    this.animalService.getAnimals().then(animals => this.animals = animals);
  }

  addToAnimal(nutriment: Nutriment): void {
    this.animalService.addNutriment(this.animalSelected, nutriment);
  }
}
