import { Component, Input, OnInit } from '@angular/core';
import { Veterinary } from './veterinary';
import { VeterinaryService } from './veterinary.service';

/*
 * Définition du component Veterinaries
*/
@Component({
  selector: 'app-veterinaries',
  templateUrl: './veterinaries.component.html',
  styleUrls: ['./veterinaries.component.css']
})

/*
 * class VeterinariesComponent
 *
 * map des fonctions :
 * getMarker() => Créer tous les marqueurs pour les vétérinaires existant
 * getAll() => Appel le service veterinaryService pour récupérer tous les vétérinaires
 * getOne() => Appel le service veterinaryService pour récupérer un vétérinaires avec son id
 * add() => Créer un vétérinaires
 * update() => Modifie un vétérinaires
 * delete() => Supprime un vétérinaires
 * showAddBlock() => Affiche le formulaire de création d'un vétérinaires
 * hideAddBlock() => Masque le formulaire de création d'un vétérinaires
 * cancelEdit() => Masque le formulaire de modification d'un vétérinaires
*/
export class VeterinariesComponent implements OnInit {
  veterinaries: Veterinary[];
  veterinaryEdited: Veterinary;
  addBlock = false;

  veterinary = new Veterinary;

  constructor(private veterinaryService: VeterinaryService) {}

  // Paramètres de la GoogleMap
  zoom: number;
  lat: number;
  lng: number;
  markers = [];

  /*
   * Récupère tous les animaux et créer des marqueurs pour qu'ils soient affichés
   * sur la GoogleMap
  */
  getMarker(): void {
    this.veterinaries.forEach((veterinary) => {
      this.markers.push({
        id: veterinary.id,
        lat: veterinary.lat,
        lng: veterinary.lng,
        label: veterinary.name,
        draggable: true
      })
    })
  }

  /*
   * Récupère la liste complète des vétérinaires depuis le veterinaryService
  */
  getAll(): void {
    this.veterinaryService
    .getVeterinaries()
    .then(veterinaries => {this.veterinaries = veterinaries; this.getMarker();});
  }

  /*
   * Récupère un vétérinaire grâce a son id depuis le veterinaryService
  */
  getOne(veterinary: Veterinary): void {
    this.veterinaryService.getVeterinary(veterinary.id).then(veterinary => this.veterinaryEdited = veterinary);
    this.addBlock = false;
  }

  /*
   * Créer un objet Veterinary et l'envoie au service veterinaryService pour qu'il soit enregistré
  */
  add(veterinary: Veterinary) : void {
    // Génère un id unique poour le vétérinaire
    veterinary.id = Math.floor((1 + Math.random()) * 0x10000);
    // Envoie le vétérinaire au service pour qu'il l'enregistre
    this.veterinaryService.addVeterinary(veterinary);
    // Masque le formulaire de création d'un vétérinaire
    this.addBlock = false;
    // Masque le formulaire de modification d'un animal
    delete this.veterinary;

    // Réinitialisation de l'objet vétérinaire pour créer un marqueur
    this.veterinary = new Veterinary;
    this.markers.push({
      id: veterinary.id,
      lat: veterinary.lat,
      lng: veterinary.lng,
      label: veterinary.name,
      draggable: true
    })
  }

  /*
   * Modifie un objet Veterinary
   * Envoie le vétérianire modifié au service veterinaryService
  */
  update(veterinary: Veterinary) : void {
    this.veterinaryService.updateVeterinaries(veterinary);
    delete this.veterinaryEdited;

    // Met à jour le marqueur sur la map
    var markerToUpdate = this.markers.filter((marker) => {
      return marker.id == veterinary.id;
    });
    markerToUpdate[0].lat = veterinary.lat;
    markerToUpdate[0].lng = veterinary.lng;
    markerToUpdate[0].label = veterinary.name;
  }

  /*
   * Récupère le vétérinaire sélectionner par l'utilisateur et l'envoie au service
   * pour qu'il soit supprimé
  */
  delete(veterinary: Veterinary) : void {
    this.veterinaryService.deleteVeterinary(veterinary);

    // Supprime le marqueur sur la map
    var markerToDelete = this.markers.filter((marker) => {
      return marker.id == veterinary.id;
    });
    const index = this.markers.indexOf(markerToDelete[0]);
    if(-1 < index) {
      this.markers.splice(index,  1);
    }
  }

  /*
   * Affiche le bloc affichant le formulaire de création d'un vétérinaire
  */
  showAddBlock(): void {
    this.addBlock = true;
    delete this.veterinaryEdited;
  }

  /*
   * Masque le bloc affichant le formulaire permettant d'ajouter un vétérinaire
  */
  hideAddBlock(): void {
    this.addBlock = false;
  }

  /*
   * Masque le bloc affichant le formulaire de modification d'un vétérinaire
  */
  cancelEdit(): void {
    delete this.veterinaryEdited;
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
