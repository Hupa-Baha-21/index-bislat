import { Injectable } from '@angular/core';

import { IDictionary } from '../features/bislat-container/bislat-container.component';
import { IDictionaryItem } from '../features/bislat-container/bislat-container.component';
import * as data from '../mock-data.json'

import { Observable, of, pipe } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { numbers } from '@material/list';
import { equalshWords } from 'src/app/pages/header/img-url';
import { ApiCallsService } from './api-connection/api-calls.service';
import { iCourseForSelectionPage } from '../inerfaces/api-interface';
import { MatListItem } from '@angular/material/list';

@Injectable({
  providedIn: 'root'
})
export class SortCoursesService {

  dictionaryData: IDictionary = data;
  MaxKeyCourses: number = 8;
  courses: any[] = [];

  constructor(private apiConnection: ApiCallsService) {
    this.courses = apiConnection.GetRequest('https://index-bislat-back.azurewebsites.net/Course');
  }

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
        const filteredCourses: iCourseForSelectionPage[] = this.courses.filter(item => (item.courseNumber.slice(0, input.length) === input));
        return of(filteredCourses);
      }
      else {
        let searchWords: string[] = this.getSearchWords(input);
        let filteredCourses: iCourseForSelectionPage[] = this.getListOfWord(searchWords[0]);

        for (let i = 1; i < searchWords.length; i++) {

          let partialFilteredCourses: iCourseForSelectionPage[] = this.getListOfWord(searchWords[i]);
          partialFilteredCourses = partialFilteredCourses.filter(item => filteredCourses.includes(item));
          filteredCourses = partialFilteredCourses;
        }
        if (filteredCourses != []) { return of(filteredCourses); }
      }
      return of(this.courses);
    })
    )
    
    
    getListOfWord(searchWord: string): iCourseForSelectionPage[] {

    let Arr: iCourseForSelectionPage[] = this.courses.filter(item => (" " + item.courseName).includes(" " + searchWord));

    for (let i = 0; i < equalshWords.length; i++) {
      if (equalshWords[i].includes(searchWord)) {
        let words: string[] = this.getSearchWords(equalshWords[i]);

        for (let index = 0; index < words.length; index++) {
          let tmpArr: iCourseForSelectionPage[] = this.courses.filter(item => ((" " + item.courseName).includes(words[index]) && !Arr.includes(item)));
          Arr = [...Arr, ...tmpArr];
        }
      }
    }
    return Arr;
  }//----------------------------------------------------

  getSearchWords(input: string): string[] {
    
    let searchWords: string[] = [];

    while (input.indexOf(' ') != -1) {
      let index = input.indexOf(' ');
      searchWords.push(input.slice(0, index));
      input = input.slice(index + 1, input.length);
    }
    searchWords.push(input);
    return searchWords;
  }
}






    //---------------------------------------------imscared
    // if (!isNaN(Number(input))) {
    //   const key = input[0];
    //   const keyDictionary: IDictionaryItem[] = this.dictionaryData[key];
  
    //   if (keyDictionary) {
    //     const filteredDictionary: IDictionaryItem[] = keyDictionary.filter(item => item.CourseNumber.includes(input));
    //     return of(filteredDictionary);
    //   }
    //   else {
    //     return of([]);
    //   }
    // }
  
    // else {
    //   // let filteredDictionary: IDictionaryItem[] = [];
    //   let inputArr: string[] = this.getSearchWords(input);
    //   let n: IDictionaryItem[] = [];
  
    //   for (let i = 0; i <= 1; i++) {
    //     const keyDictionary: IDictionaryItem[] = this.dictionaryData[i];
  
    //     if (keyDictionary) { n = [...n, ...this.getList(inputArr, keyDictionary)]; }
    //   }
    //   return of(n);
    // }






    // getList(searchWords: string[], keyDictionary: iCourseForSelectionPage[]): iCourseForSelectionPage[] {

  //   let Arr: iCourseForSelectionPage[] = this.getListOfWord(searchWords[0]);
  //   let list: iCourseForSelectionPage[] = [];

  //   for (let i = 1; i < searchWords.length; i++) {
  //     let tmpArr: iCourseForSelectionPage[] = this.getListOfWord(searchWords[i]);

  //     for (let y = 0; y < Arr.length; y++) {
  //       let tmp = tmpArr.filter(item => (" " + item.courseName).includes(Arr[y].courseName));
  //       list = [...list, ...tmp];
  //     }
  //     Arr = list;
  //     list = [];
  //   }
  //   return Arr;
  // }//----------------------------------------------------