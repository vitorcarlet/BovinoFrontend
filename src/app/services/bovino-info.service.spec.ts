import { TestBed } from '@angular/core/testing';

import { BovinoInfoService } from './bovino-info.service';

describe('BovinoInfoService', () => {
  let service: BovinoInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BovinoInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
