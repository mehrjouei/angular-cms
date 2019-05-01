import { TestBed } from '@angular/core/testing';

import { TempAuthService } from './temp-auth.service';

describe('TempAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TempAuthService = TestBed.get(TempAuthService);
    expect(service).toBeTruthy();
  });
});
