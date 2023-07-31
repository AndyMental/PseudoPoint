import { TestBed } from '@angular/core/testing';

import { Oauth1Service } from './oauth1.service';

describe('Oauth1Service', () => {
  let service: Oauth1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oauth1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
