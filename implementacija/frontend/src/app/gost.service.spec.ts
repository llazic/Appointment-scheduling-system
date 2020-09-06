import { TestBed } from '@angular/core/testing';

import { GostService } from './gost.service';

describe('GostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GostService = TestBed.get(GostService);
    expect(service).toBeTruthy();
  });
});
