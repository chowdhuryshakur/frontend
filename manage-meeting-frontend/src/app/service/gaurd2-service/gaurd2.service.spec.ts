import { TestBed } from '@angular/core/testing';

import { Gaurd2Service } from './gaurd2.service';

describe('Gaurd2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Gaurd2Service = TestBed.get(Gaurd2Service);
    expect(service).toBeTruthy();
  });
});
