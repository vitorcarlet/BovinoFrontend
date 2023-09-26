import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAnimalEvolutionComponent } from './manage-animal-evolution.component';

describe('ManageAnimalEvolutionComponent', () => {
  let component: ManageAnimalEvolutionComponent;
  let fixture: ComponentFixture<ManageAnimalEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAnimalEvolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAnimalEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
