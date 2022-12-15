import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { SortCoursesService } from '../../services/sort-courses.service';
import { openingParagraphs, openingVideosUrl } from 'src/app/pages/header/img-url';
import { iCourseForSelectionPage } from 'src/app/inerfaces/api-interface';


@Component({
  selector: 'app-bislat-container',
  templateUrl: './bislat-container.component.html',
  styleUrls: ['./bislat-container.component.scss']
})
export class BislatContainerComponent implements OnInit {

  inputControl: FormControl = new FormControl();
  indexOutput$: Observable<iCourseForSelectionPage[]>;

  resultItem$ = new Subject<iCourseForSelectionPage | undefined>();

  showList: boolean = false;
  item: IDictionaryItem | undefined;

  readMoreButton = [false, 1]; //[f-short t-long, mun of paragraphs]
  openingParagraphs: string[] = openingParagraphs;
  openingVideosUrl = openingVideosUrl;

  constructor(service: SortCoursesService) {

    this.indexOutput$ = this.inputControl.valueChanges.pipe(
      service.getListCourses()
    );
  }

  ngOnInit(): void { }

  handleShowList(show: boolean): void {
    this.showList = show;
  }

  handleSelected(item: iCourseForSelectionPage): void {
    this.resultItem$.next(item);
    this.inputControl.setValue(item.courseNumber);
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

    if (this.readMoreButton[0]) { this.readMoreButton = [false, 1]; }
    else { this.readMoreButton = [true, this.openingParagraphs.length]; }
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