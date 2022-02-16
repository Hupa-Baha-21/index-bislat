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

  constructor() { }

  getSelectedCourse(courseNumber: string): IDictionaryItem {

    let tmp1!: IDictionaryItem;

    if (courseNumber) {
      const key = courseNumber[0];
      const keyDictionary: IDictionaryItem[] = this.dictionaryData[key];

      if (keyDictionary) {
        for (let i = 0; i < keyDictionary.length; i++) {
          let tmp: IDictionaryItem = keyDictionary[i];

          if (tmp.CourseNumber === courseNumber) { return tmp; }
        }
      }
    }
    else {
      return tmp1;
    }
    return tmp1;
  }
  //------------------------------------------------------------------------------------

  isItemFavorite(item: IDictionaryItem): boolean {

    let favorites: string[] = JSON.parse(localStorage.getItem('courseNumber') || '[]');

    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i] === item.CourseNumber) { return true; }
    }

    return false;
  }
  //------------------------------------------------------------------------------------

  findFavoriteCourses(): IDictionaryItem[] {

    let coursesNumber: string[] = JSON.parse(localStorage.getItem('courseNumber') || '[]');
    let favorites: IDictionaryItem[] = [];
    console.log(coursesNumber);

    for (let i = 0; i < coursesNumber.length; i++) {

      const key = coursesNumber[i];
      let keyDictionary: IDictionaryItem[] = this.dictionaryData[key[0]];

      for (let y = 0; y < keyDictionary.length; y++) {
        if (coursesNumber[i] === keyDictionary[y].CourseNumber) { favorites.push(keyDictionary[y]); }
      }
    }
    console.log(favorites);
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
