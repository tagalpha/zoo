import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrimentComponent } from './nutriment.component';

describe('NutrimentComponent', () => {
  let component: NutrimentComponent;
  let fixture: ComponentFixture<NutrimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutrimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
