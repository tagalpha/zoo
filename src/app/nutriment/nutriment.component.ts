import { Component, OnInit } from '@angular/core';
import { NutrimentService } from './nutriment.service';
import { Nutriment } from './nutriment';

@Component({
  selector: 'app-nutriment',
  templateUrl: './nutriment.component.html',
  styleUrls: ['./nutriment.component.css'],
  providers: [NutrimentService]
})

export class NutrimentComponent implements OnInit {
  nutriments: Nutriment[];

  constructor(private nutrimentService: NutrimentService) { }

  ngOnInit() {
    this.nutrimentService.getServices().then(response => this.nutriments = response);
  }
}
