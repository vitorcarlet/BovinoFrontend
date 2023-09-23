import { TestBed } from '@angular/core/testing';

import { AnimalTableService } from './animal-table.service';

describe('AnimalTableService', () => {
  let service: AnimalTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
