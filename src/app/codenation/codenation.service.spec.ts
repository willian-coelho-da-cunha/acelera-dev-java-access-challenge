import { TestBed } from '@angular/core/testing';

import { CodenationService } from './codenation.service';

describe('CodenationService', () => {
  let service: CodenationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodenationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
