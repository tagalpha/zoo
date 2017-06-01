import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Animal } from './../animal/animal';
import { AnimalService } from './../animal/animal.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private animalService: AnimalService) {}

  animalId: number;
  animalDetail: Animal  = new Animal();

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
        this.animalId = params['id'];
      });
    this.animalService.getAnimal(this.animalId).then(animal => this.animalDetail = animal);
  }

}
