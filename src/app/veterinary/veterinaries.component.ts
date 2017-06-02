import { Component, Input, OnInit } from '@angular/core';
import { Veterinary } from './veterinary';
import { VeterinaryService } from './veterinary.service';

@Component({
  selector: 'app-veterinaries',
  templateUrl: './veterinaries.component.html',
  styleUrls: ['./veterinaries.component.css']
})
export class VeterinariesComponent implements OnInit {
  veterinaries: Veterinary[];
  veterinaryEdited: Veterinary;
  addBlock = false;

  veterinary = new Veterinary;

  constructor(private veterinaryService: VeterinaryService) {}

  // google maps zoom level
  zoom: number;
  lat: number;
  lng: number;
  markers = [];

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

  getAll(): void {
    this.veterinaryService
    .getVeterinaries()
    .then(veterinaries => {this.veterinaries = veterinaries; this.getMarker();});
  }

  getOne(veterinary: Veterinary): void {
    this.veterinaryService.getVeterinary(veterinary.id).then(veterinary => this.veterinaryEdited = veterinary);
    this.addBlock = false;
  }

  add(veterinary: Veterinary) : void {
    veterinary.id = Math.floor((1 + Math.random()) * 0x10000);
    this.veterinaryService.addVeterinary(veterinary);
    this.addBlock = false;
    delete this.veterinary;
    this.veterinary = new Veterinary;
    this.markers.push({
      id: veterinary.id,
      lat: veterinary.lat,
      lng: veterinary.lng,
      label: veterinary.name,
      draggable: true
    })
  }

  update(veterinary: Veterinary) : void {
    this.veterinaryService.updateVeterinaries(veterinary);
    delete this.veterinaryEdited;
    var markerToUpdate = this.markers.filter((marker) => {
      return marker.id == veterinary.id;
    });
    markerToUpdate[0].lat = veterinary.lat;
    markerToUpdate[0].lng = veterinary.lng;
    markerToUpdate[0].label = veterinary.name;
  }

  delete(veterinary: Veterinary) : void {
    this.veterinaryService.deleteVeterinary(veterinary);
    var markerToDelete = this.markers.filter((marker) => {
      return marker.id == veterinary.id;
    });
    const index = this.markers.indexOf(markerToDelete[0]);
    if(-1 < index) {
      this.markers.splice(index,  1);
    }
  }

  showAddBlock(): void {
    this.addBlock = true;
    delete this.veterinaryEdited;
  }
  hideAddBlock(): void {
    this.addBlock = false;
  }

  cancelEdit(): void {
    delete this.veterinaryEdited;
  }

  ngOnInit(): void {
    this.getAll();
    // google maps zoom level
    this.zoom = 11;

    this.lat = 48.8641500;
    this.lng = 2.4832200;
  }
}
