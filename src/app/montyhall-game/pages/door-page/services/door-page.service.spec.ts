import { TestBed } from '@angular/core/testing';

import { DoorPageService } from './door-page.service';

describe('DoorPageService', () => {
  let service: DoorPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoorPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
