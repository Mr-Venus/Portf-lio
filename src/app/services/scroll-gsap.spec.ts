import { TestBed } from '@angular/core/testing';

import { ScrollGsap } from './scroll-gsap';

describe('ScrollGsap', () => {
  let service: ScrollGsap;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollGsap);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
