import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
// import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
// import * as data from '../../mock-data.json'
import { SortCoursesService } from './sort-courses.service';


@Component({
  selector: 'app-bislat-container',
  templateUrl: './bislat-container.component.html',
  styleUrls: ['./bislat-container.component.scss']
})
export class BislatContainerComponent implements OnInit {

  inputControl: FormControl = new FormControl();
  indexOutput$: Observable<IDictionaryItem[]>;

  resultItem$ = new Subject<IDictionaryItem | undefined>();

  showList: boolean = false;
  item: IDictionaryItem | undefined;

  constructor(service: SortCoursesService) {

    this.indexOutput$ = this.inputControl.valueChanges.pipe(
      service.getListCourses()
    );
  }

  ngOnInit(): void {
    // this.setValueInPlaceholder()
  }

  handleShowList(show: boolean): void {
    this.showList = show;
  }

  handleSelected(item: IDictionaryItem): void {
    this.resultItem$.next(item);
    this.inputControl.setValue(item.CourseNumber);
  }

  handleClear(): void {
    this.inputControl.setValue('');
    this.resultItem$.next(undefined);
  }

  // setValueInPlaceholder(): void {
  //   if (sessionStorage.getItem('ValueInPlaceholder')) {
  //     this.inputControl.setValue(sessionStorage.getItem('ValueInPlaceholder'));
  //   }
  // } ??
}

export interface IDictionary {
  [key: string]: any;
}

export interface IDictionaryItem {
  CourseNumber: string;
  CourseName: string;
  CourseTime: string;
  CourseBases: string;
  CourseDescription1: string;
  CourseDescription2: string;
  YouTubeURL: string;
  ImgURL: string;
}



// this.indexOutput$ = new Observable<IDictionaryItem[]>();
// console.log(this.inputControl.valueChanges.subscribe(value => console.log(value)));
// const dictionaryData: IDictionary = data;
// this.indexOutput$ = this.inputControl.valueChanges.pipe(
//   debounceTime(300),
//   distinctUntilChanged(),
//   switchMap((input: string) => {

//     input = input.trim();

//     if (input) {
//       const key = input[0];
//       const keyDictionary: IDictionaryItem[] = dictionaryData[key];

//       if (keyDictionary) {
//         const filteredDictionary: IDictionaryItem[] = keyDictionary.filter(item => item.CourseNumber.includes(input));
//         return of(filteredDictionary);
//       }
//       else {
//         return of([]);
//       }
//     }
//     else {
//       return of([]);
//     }
//   })
// );