import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinariesComponent } from './veterinaries.component';

describe('VeterinariesComponent', () => {
  let component: VeterinariesComponent;
  let fixture: ComponentFixture<VeterinariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeterinariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
