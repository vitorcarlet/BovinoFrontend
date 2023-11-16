import { TestBed } from '@angular/core/testing';

import { MonthlyOxWeightService } from './monthly-ox-weight.service';

describe('MonthlyOxWeightService', () => {
  let service: MonthlyOxWeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyOxWeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
