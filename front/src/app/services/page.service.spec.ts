import { TestBed } from '@angular/core/testing';

import { PageService } from './page.service';

describe('PagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageService = TestBed.get(PageService);
    expect(service).toBeTruthy();
  });
});
