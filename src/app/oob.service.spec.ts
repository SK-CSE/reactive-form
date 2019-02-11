import { TestBed } from '@angular/core/testing';

import { OobService } from './oob.service';

describe('OobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OobService = TestBed.get(OobService);
    expect(service).toBeTruthy();
  });
});
