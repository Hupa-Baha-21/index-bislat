import { TestBed } from '@angular/core/testing';

import { SortCoursesService } from './features/bislat-container/sort-courses.service';

describe('SortCoursesService', () => {
  let service: SortCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
