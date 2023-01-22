import { TestBed } from '@angular/core/testing';

import { searchCourses } from './search-courses.service';

describe('SortCoursesService', () => {
  let service: searchCourses;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(searchCourses);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
