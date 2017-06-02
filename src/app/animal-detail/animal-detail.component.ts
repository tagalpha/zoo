import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Animal } from './../animal/animal';
import { AnimalService } from './../animal/animal.service';
import { VeterinaryService } from './../veterinary/veterinary.service'

@Component({
    selector: 'app-animal-detail',
    templateUrl: './animal-detail.component.html',
    styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {

    constructor(private activatedRoute:ActivatedRoute, private animalService:AnimalService, private veterinaryService:VeterinaryService) {
    }

    animalId:string;
    animalDetail:Animal = new Animal();
    zoom:number;
    lat:number;
    lng:number;
    markers = [];

    ngOnInit() {
        this.activatedRoute.params.subscribe((params:Params) => {
            this.animalId = params['id'];
        });
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
