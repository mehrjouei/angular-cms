import { TestBed } from '@angular/core/testing';

import { MasterInjector } from './master-injector.service';

describe('MasterInjectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterInjector = TestBed.get(MasterInjector);
    expect(service).toBeTruthy();
  });
});
