import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import * as data from '../../mock-data.json'

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

  constructor() { 
    
    const dictionaryData: IDictionary = data;
    this.indexOutput$ = this.inputControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((input: string) => {
        
        input = input.trim();
        
        if (input) {
          const key = input[0];
          const keyDictionary: IDictionaryItem[] = dictionaryData[key];

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
    );
  }

  ngOnInit(): void {
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
}

export interface IDictionary {
  [key: string]: any;
}

export interface IDictionaryItem {
  CourseNumber: string;
  CourseName: string;
  CourseTime: string;
  CourseBases:string;
  CourseDescription1: string;
  CourseDescription2: string;
  YouTubeURL: string;
  ImgURL: string;
}
