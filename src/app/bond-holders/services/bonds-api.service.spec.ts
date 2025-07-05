import { TestBed } from '@angular/core/testing';

import { BondsApiService } from './bonds-api.service';

describe('BondsApiService', () => {
  let service: BondsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BondsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
