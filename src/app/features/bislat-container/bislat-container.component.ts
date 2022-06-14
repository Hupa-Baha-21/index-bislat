import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { SortCoursesService } from './sort-courses.service';
import { openingParagraphs } from 'src/app/pages/header/img-url';


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

  readMoreButton = ['readMore', 1]; //[img, mun of paragraphs]
  openingParagraphs: string[] = openingParagraphs;

  constructor(service: SortCoursesService) {

    this.indexOutput$ = this.inputControl.valueChanges.pipe(
      service.getListCourses()
    );
  }

  ngOnInit(): void { }

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

  routingPage() {
    window.open(
      'https://youtube.com/channel/UCElJ2Ybi3FBsslbq5ROLQoA',
      '_blank'
    );
  }

  readMoreButtonClick(): void {

    if (this.readMoreButton[0] === "readMore") {
      this.readMoreButton = ["readLess", this.openingParagraphs.length];
    }
    else {
      this.readMoreButton = ["readMore", 1];
    }
  }

  threeImagesPosition(): boolean {
    if ((window.innerWidth / window.innerHeight) > 1) { return true; }
    else { return false; }
  }
}

export interface IDictionary {
  [key: string]: any;
}

export interface IDictionaryItem {
  category: string;
  CourseNumber: string;
  CourseName: string;
  CourseTime: string;
  CourseBases: string[];
  CourseDescription: string;
  YouTubeURL: string;
  ImgURL: string;
  note?: string;
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