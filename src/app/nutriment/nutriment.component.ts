import { Component, OnInit } from '@angular/core';
import { NutrimentService } from './nutriment.service';
import { Nutriment } from './nutriment';
import { Animal } from './../animal/animal';
import { AnimalService } from './../animal/animal.service';

/*
 * Définition du component Nutriment
*/
@Component({
  selector: 'app-nutriment',
  templateUrl: './nutriment.component.html',
  styleUrls: ['./nutriment.component.css'],
  providers: [NutrimentService]
})

/*
 * class NutrimentComponent
*/
export class NutrimentComponent implements OnInit {
  animals: Animal[];
  nutriments: Nutriment[];
  animalSelected: Animal;

  constructor(private nutrimentService: NutrimentService, private animalService: AnimalService) {}

  ngOnInit() {
    // Appel le service nutrimentService pour récupérer la liste des nutriments
    this.nutrimentService.getServices().then(response => this.nutriments = response);
    // Appel le service animalService pour récupérer la liste des animaux
    this.animalService.getAnimals().then(animals => this.animals = animals);
  }

  /*
   * Ajoute un nutriment à un animal
  */
  addToAnimal(nutriment: Nutriment): void {
    // Appel le service animalService avec l'aniaml sélectionné et le nutriment
    this.animalService.addNutriment(this.animalSelected, nutriment);
  }
}
