import { Injectable } from '@angular/core';

import { IDictionary } from '../features/bislat-container/bislat-container.component';
import { IDictionaryItem } from '../features/bislat-container/bislat-container.component';
import * as data from '../mock-data.json'

import { Observable, of, pipe } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { numbers } from '@material/list';
import { equalshWords } from 'src/app/pages/header/img-url';

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

      if (!isNaN(Number(input))) {
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
        // let filteredDictionary: IDictionaryItem[] = [];
        let inputArr: string[] = this.getSearchWords(input);
        let n: IDictionaryItem[] = [];

        for (let i = 0; i <= 1; i++) {
          const keyDictionary: IDictionaryItem[] = this.dictionaryData[i];

          if (keyDictionary) { n = [...n, ...this.getList(inputArr, keyDictionary)]; }
        }
        return of(n);
      }
    })
  )

  getList(searchWords: string[], keyDictionary: IDictionaryItem[]): IDictionaryItem[] {

    let Arr: IDictionaryItem[] = this.getListOfWord(searchWords[0], keyDictionary);
    let list: IDictionaryItem[] = [];

    for (let i = 1; i < searchWords.length; i++) {
      let tmpArr: IDictionaryItem[] = this.getListOfWord(searchWords[i], keyDictionary);

      for (let y = 0; y < Arr.length; y++) {
        let tmp = tmpArr.filter(item => (" " + item.CourseName).includes(Arr[y].CourseName));
        list = [...list, ...tmp];
      }
      Arr = list;
      list = [];
    }
    return Arr;
  }//----------------------------------------------------

  getListOfWord(searchWord: string, keyDictionary: IDictionaryItem[]): IDictionaryItem[] {

    let Arr: IDictionaryItem[] = [];

    for (let i = 0; i < equalshWords.length; i++) {
      if (equalshWords[i].includes(searchWord)) {
        let words: string[] = this.getSearchWords(equalshWords[i]);

        for (let index = 0; index < words.length; index++) {
          let tmpArr: IDictionaryItem[] = keyDictionary.filter(item => (" " + item.CourseName).includes(words[index]));
          Arr = [...Arr, ...tmpArr];
        }
        return Arr;
      }
    }
    return keyDictionary.filter(item => (" " + item.CourseName).includes(searchWord));
  }//----------------------------------------------------

  getSearchWords(input: string) {

    let Arr: string[] = [];
    let tmp: string = " ";

    for (let i = 0; i < input.length; i++) {

      if (input[i] != " ") {
        tmp = tmp + input[i];
      }
      else {
        Arr.push(tmp);
        tmp = " ";
      }
    }
    Arr.push(tmp);
    // console.log(Arr);
    return Arr;
  }//--------
}