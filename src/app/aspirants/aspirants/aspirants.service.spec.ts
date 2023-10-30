import { TestBed } from '@angular/core/testing';

import { AspirantsService } from './aspirants.service';

describe('AspirantsService', () => {
  let service: AspirantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AspirantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
