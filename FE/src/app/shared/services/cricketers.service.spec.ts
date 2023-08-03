import { TestBed } from '@angular/core/testing';

import { CricketersService } from './cricketers.service';

describe('CricketersService', () => {
  let service: CricketersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CricketersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
