import { TestBed } from '@angular/core/testing';

import { WindowRef } from './window-ref.service';

describe('WindowRefService', () => {
  let service: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
