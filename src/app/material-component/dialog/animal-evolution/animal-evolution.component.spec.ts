import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalEvolutionComponent } from './animal-evolution.component';

describe('AnimalEvolutionComponent', () => {
  let component: AnimalEvolutionComponent;
  let fixture: ComponentFixture<AnimalEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalEvolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
