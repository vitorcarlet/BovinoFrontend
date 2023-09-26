import { TestBed } from '@angular/core/testing';

import { AnimalEvolutionService } from './animal-evolution-service';

describe('AnimalEvolutionServiceService', () => {
  let service: AnimalEvolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalEvolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
