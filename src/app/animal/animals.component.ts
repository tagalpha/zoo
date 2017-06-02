import { Component, Input, OnInit } from '@angular/core';
import { Animal } from './animal';
import { AnimalService } from './animal.service';

/*
 * Définition du component Animal
*/
@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})

/*
 * Class AnimalsComponent
 *
 * Map des fonctions:
 * getMarker() => Créer tous les marqueurs pour les animaux existant
 * getAll() => Appel le service animalService pour récupérer tous les animaux
 * getOne() => Appel le service animalService pour récupérer un animal avec son id
 * add() => Créer un animal
 * update() => Modifie un animal
 * delete() => Supprime un animal
 * showAddBlock() => Affiche le formulaire de création d'un animal
 * hideAddBlock() => Masque le formulaire de création d'un animal
 * cancelEdit() => Masque le formulaire de modification d'un animal
*/
export class AnimalsComponent implements OnInit {

  animal = new Animal;
  animals: Animal[];
  animalEdited: Animal;
  addBlock = false;

  // Paramètres de la GoogleMap
  zoom: number;
  lat: number;
  lng: number;
  markers = [];

  constructor(private animalService: AnimalService) {}

  /*
   * Récupère tous les animaux et créer des marqueurs pour qu'ils soient affichés
   * sur la GoogleMap
  */
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

  /*
   * Récupère la liste complète des animaux depuis le animalService
  */
  getAll(): void {
    this.animalService.getAnimals()
      .then(animals => {
        this.animals = animals; this.getMarker();
      })
    ;
  }

  /*
   * Récupère un animal grâce a son id depuis le animalService
  */
  getOne(animal: Animal): void {
    this.animalService.getAnimal(animal.id).then(animal => this.animalEdited = animal);
    this.addBlock = false;
  }

  /*
   * Créer un objet Animal et l'envoie au service animalService pour qu'il soit enregistré
  */
  add(animal: Animal) : void {
    // Génère un id unique poour l'animal
    animal.id = Math.floor((1 + Math.random()) * 0x10000);
    // Envoie l'aniaml au service pour qu'il l'enregistre
    this.animalService.addAnimals(animal);
    // Masque le formulaire de création d'un animal
    this.addBlock = false;
    // Masque le formulaire de modification d'un animal
    delete this.animal;

    // Réinitialisation de l'objet animal pour créer un marqueur
    this.animal = new Animal;
    this.markers.push({
      id: animal.id,
      lat: animal.lat,
      lng: animal.lng,
      label: animal.name,
      draggable: true
    })
  }

  /*
   * Modifie un objet Animal
   * Envoie l'animal modifié au service animalService
  */
  update(animal: Animal) : void {
    this.animalService.updateAnimals(animal);
    delete this.animalEdited;

    // Met à jour le marqueur sur la map
    var markerToUpdate = this.markers.filter((marker) => {
      return marker.id == animal.id;
    });
    markerToUpdate[0].lat = animal.lat;
    markerToUpdate[0].lng = animal.lng;
    markerToUpdate[0].label = animal.name;
  }

  /*
   * Récupère l'animal sélectionner par l'utilisateur et l'envoie au service
   * pour qu'il soit supprimé
  */
  delete(animal: Animal) : void {
    this.animalService.deleteAnimals(animal);
    // Supprime le marqueur sur la map
    var markerToDelete = this.markers.filter((marker) => {
      return marker.id == animal.id;
    });
    const index = this.markers.indexOf(markerToDelete[0]);
    if(-1 < index) {
      this.markers.splice(index,  1);
    }
  }

  /*
   * Affiche le bloc affichant le formulaire de création d'un animal
  */
  showAddBlock(): void {
    this.addBlock = true;
    delete this.animalEdited;
  }

  /*
   * Masque le bloc affichant le formulaire permettant d'ajouter un animal
  */
  hideAddBlock(): void {
    this.addBlock = false;
  }

  /*
   * Masque le bloc affichant le formulaire de modification d'un animal
  */
  cancelEdit(): void {
    delete this.animalEdited;
  }

  /*
   * Toutes les actions s'effectuant à l'initialisation de la classe
  */
  ngOnInit(): void {
    this.getAll();
    // google maps zoom level
    this.zoom = 3;
    this.lat = 41.8641500;
    this.lng = 52.3097200;
  }
}
