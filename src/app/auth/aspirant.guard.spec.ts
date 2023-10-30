import { TestBed } from '@angular/core/testing';

import { AspirantGuard } from './aspirant.guard';

describe('AspirantGuard', () => {
  let guard: AspirantGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AspirantGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
