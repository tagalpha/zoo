import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Animal } from './../animal/animal';
import { AnimalService } from './../animal/animal.service';
import { VeterinaryService } from './../veterinary/veterinary.service'

/*
 * Définition du component AnimalDetailComponent
*/
@Component({
    selector: 'app-animal-detail',
    templateUrl: './animal-detail.component.html',
    styleUrls: ['./animal-detail.component.css']
})

/*
 * class AnimalDetailComponent
*/
export class AnimalDetailComponent implements OnInit {

  animalId:string;
  animalDetail:Animal = new Animal();
  zoom:number;
  lat:number;
  lng:number;
  markers = [];

  constructor(private activatedRoute:ActivatedRoute, private animalService:AnimalService, private veterinaryService:VeterinaryService) {}

  ngOnInit() {
    // Récupère l'id de l'aniaml dans l'url
    this.activatedRoute.params.subscribe((params:Params) => {
        this.animalId = params['id'];
    });

    // Récupère la liste des vétérinaires depuis le service veterinaryService
    // pour les afficher sur la map
    this.veterinaryService.getVeterinaries()
      .then(veterinaries => {
          veterinaries.forEach((veterinary) => {
              this.markers.push({
                  lat: veterinary.lat,
                  lng: veterinary.lng,
                  label: veterinary.name,
                  draggable: true
              })
          });
      });

      // Récupère l'animal grâce à son id depuis le service animalService
      // Créer un marqueur pour afficher l'animal sur la carte
      this.animalService.getAnimal(parseInt(this.animalId))
        .then(animal => {
          this.animalDetail = animal;
          this.markers.push({
            lat: animal.lat,
            lng: animal.lng,
            label: animal.name,
            draggable: true
          });
          this.zoom = 11;
          this.lat = animal.lat;
          this.lng = animal.lng;
      });
  }
}
