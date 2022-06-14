import { Injectable } from '@angular/core';

import { IDictionary } from './bislat-container.component';
import { IDictionaryItem } from './bislat-container.component';
import * as data from '../../mock-data.json'

import { Observable, of, pipe } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SortCoursesService {

  dictionaryData: IDictionary = data;
  MaxKeyCourses: number = 8;

  constructor() { }

  getSelectedCourse(courseNumber: string): IDictionaryItem {

    let tmp1!: IDictionaryItem;
    let courseName: any = sessionStorage.getItem("selectedItem");

    if (courseNumber) {
      const key = courseNumber[0];
      const keyDictionary: IDictionaryItem[] = this.dictionaryData[key];

      if (keyDictionary) {
        for (let i = 0; i < keyDictionary.length; i++) {
          let tmp: IDictionaryItem = keyDictionary[i];

          if (tmp.CourseNumber === courseNumber && tmp.CourseName === courseName) { return tmp; }
        }
      }
    }
    else {
      return tmp1;
    }
    return tmp1;
  }
  //------------------------------------------------------------------------------------

  isItemFavorite(item: IDictionaryItem): string {

    const favorites: string[] = JSON.parse(localStorage.getItem('courseName') || '[]');

    if (favorites.includes(item.CourseName)) { return 'favorite.svg'; }
    return 'notFavorite.svg';
  }
  //------------------------------------------------------------------------------------

  findFavoriteCourses(): IDictionaryItem[] {

    let coursesNames: string[] = JSON.parse(localStorage.getItem('courseName') || '[]');
    let favorites: IDictionaryItem[] = [];

    for (let i = 0; i <= this.MaxKeyCourses; i++) {

      let keyDictionary: IDictionaryItem[] = [];
      if (this.dictionaryData[i]) { keyDictionary = this.dictionaryData[i]; }

      let index = 0;

      while (keyDictionary[index]) {
        if (coursesNames.includes(keyDictionary[index].CourseName)) { favorites.push(keyDictionary[index]); }
        index++;
      }
    }

    return favorites;
  }
  //------------------------------------------------------------------------------------

  getListCourses = () => pipe(
    debounceTime(300),
    distinctUntilChanged<string>(),
    switchMap((input: string) => {

      input = input.trim();

      if (input) {
        const key = input[0];
        const keyDictionary: IDictionaryItem[] = this.dictionaryData[key];

        if (keyDictionary) {
          const filteredDictionary: IDictionaryItem[] = keyDictionary.filter(item => item.CourseNumber.includes(input));
          return of(filteredDictionary);
        }
        else {
          return of([]);
        }
      }
      else {
        return of([]);
      }
    })
  )
}


