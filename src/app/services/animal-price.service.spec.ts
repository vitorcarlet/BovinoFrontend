import { TestBed } from '@angular/core/testing';

import { AnimalPriceService } from './animal-price.service';

describe('AnimalPriceService', () => {
  let service: AnimalPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
