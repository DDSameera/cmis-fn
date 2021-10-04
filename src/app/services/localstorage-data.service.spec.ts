import { TestBed } from '@angular/core/testing';

import { LocalstorageDataService } from './localstorage-data.service';

describe('LocalstorageDataService', () => {
  let service: LocalstorageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
