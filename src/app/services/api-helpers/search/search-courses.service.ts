import { Injectable } from '@angular/core';

import { IDictionary } from '../../../features/bislat-container/bislat-container.component';
import { IDictionaryItem } from '../../../features/bislat-container/bislat-container.component';
import * as data from '../../../mock-data.json'

import { Observable, of, pipe } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { equalshWords } from 'src/app/pages/header/img-url';
import { ApiCallsService } from '../../api-connection/api-calls.service';
import { iCourseForSelectionPage } from '../../../inerfaces/api-interface';

@Injectable({
  providedIn: 'root'
})
export class searchCourses {

  // dictionaryData: IDictionary = data;
  courses: any[];
  unclearedCourses: any[];

  constructor(private apiConnection: ApiCallsService) {
    this.courses = apiConnection.GetRequest('https://index-bislat-back.azurewebsites.net/Course');
    this.unclearedCourses = this.apiConnection.GetRequest("https://index-bislat-back.azurewebsites.net/Course");
  }

  getClearedSelectedCourses(coursesName: string[]): any {

    let selectedCourses: any = [];

    for(let i = 0; i < coursesName.length; i++){
      if(coursesName[i][0] === '"') { coursesName[i] = coursesName[i].slice(1,coursesName[i].length-1); }  //clear ""
      
      let unclearedCourseNumber = this.unclearedCourses.filter(item => item.courseName === coursesName[i])[0].courseNumber;
      let course = this.apiConnection.GetRequest("https://index-bislat-back.azurewebsites.net/Course/" + unclearedCourseNumber);
      
      if(course.courseNumber.includes("_")){
        let index = course.courseNumber.indexOf("_");
        course.courseNumber = course.courseNumber.slice(0, index);
      }
      selectedCourses.push(course);
    }

    return selectedCourses;
  }
  //------------------------------------------------------------------------------------

  isItemFavorite(item: any): string {

    const favorites: string[] = JSON.parse(localStorage.getItem('courseName') || '[]');

    if (favorites.includes(item.courseName)) { return 'favorite.svg'; }
    return 'notFavorite.svg';
  }
  //------------------------------------------------------------------------------------
  
  getListCourses = () => pipe(
    debounceTime(300),
    distinctUntilChanged<string>(),
    switchMap((input: string) => {

      input = input.trim();

      if (!isNaN(Number(input)) && input != '') {
        const filteredCourses = this.courses.filter(item => (item.courseNumber.slice(0, input.length) === input));
        return of(this.clearCourseNumber(filteredCourses));
      }
      else if(isNaN(Number(input)) && input != '') {
        let searchWords: string[] = this.getSearchWords(input);
        let filteredCourses: any[] = this.getListOfWord(searchWords[0]);

        for (let i = 1; i < searchWords.length; i++) {

          let partialFilteredCourses: any[] = this.getListOfWord(searchWords[i]);
          partialFilteredCourses = partialFilteredCourses.filter(item => filteredCourses.includes(item));
          filteredCourses = partialFilteredCourses;
        }
        if (filteredCourses != []) { return of(this.clearCourseNumber(filteredCourses)); }
      }
      return of([]);
    })
    )
    
    
    getListOfWord(searchWord: string): iCourseForSelectionPage[] {

      let Arr: any[] = this.courses.filter(item => (" " + item.courseName).includes(" " + searchWord));

      for (let i = 0; i < equalshWords.length; i++) {
        if (equalshWords[i].includes(searchWord)) {
          let words: string[] = this.getSearchWords(equalshWords[i]);

          for (let index = 0; index < words.length; index++) {
            let tmpArr: any[] = this.courses.filter(item => ((" " + item.courseName).includes(words[index]) && !Arr.includes(item)));
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

  clearCourseNumber(courses: iCourseForSelectionPage[]) {

    for(let i = 0; i < courses.length; i++){
      if(isNaN(Number(courses[i].courseNumber))){
        
        let index = courses[i].courseNumber.indexOf("_");
        courses[i].courseNumber = courses[i].courseNumber.slice(0, index);
      }
    }
    return courses;
  }
  
  findCourseNumber(courses: any[]) {
    let unclearedCourses: any[] = this.apiConnection.GetRequest("https://index-bislat-back.azurewebsites.net/Course");
    let coursesNumber: string[] = [];

    for(let i = 0; i < courses.length; i++){
      coursesNumber.push(unclearedCourses.filter(item => item.courseName === courses[i].courseName)[0].courseNumber);
      // coursesNumber.push(courses[i].courseNum);
    }
    return coursesNumber;
  }
}




// findFavoriteCourses(): IDictionaryItem[] {

//   let coursesNames: string[] = JSON.parse(localStorage.getItem('courseName') || '[]');
//   let favorites: any[] = [];

//   for (let i = 0; i <= this.MaxKeyCourses; i++) {

//     let keyDictionary: IDictionaryItem[] = [];
//     if (this.dictionaryData[i]) { keyDictionary = this.dictionaryData[i]; }

//     let index = 0;

//     while (keyDictionary[index]) {
//       if (coursesNames.includes(keyDictionary[index].CourseName)) { favorites.push(keyDictionary[index]); }
//       index++;
//     }
//   }

//   return favorites;
// }




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