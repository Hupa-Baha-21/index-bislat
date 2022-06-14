import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IDictionaryItem } from 'src/app/features/bislat-container/bislat-container.component';
import { SortCoursesService } from 'src/app/features/bislat-container/sort-courses.service';
import { Observable, Subject } from 'rxjs';
import { EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  showMenuBar: boolean = false;
  selectedPage: string = "selectionForm";

  inputControl: FormControl = new FormControl();
  indexOutput$: Observable<IDictionaryItem[]>;

  resultItem$ = new Subject<IDictionaryItem | undefined>();
  showList: boolean = false;
  @Output() showListEmitter = new EventEmitter<boolean>();

  constructor(service: SortCoursesService) {

    this.indexOutput$ = this.inputControl.valueChanges.pipe(
      service.getListCourses()
    );
  }

  ngOnInit(): void {
  }

  menuCliked(): boolean {
    if (!this.showMenuBar) {
      this.showMenuBar = true;
      return true;
    }
    else {
      this.showMenuBar = false;
      return false;
    }
  }

  changePage(pageName: string): void {

    switch (pageName) {
      case 'selectionForm':
        this.selectedPage = 'selectionForm';
        break;
      case 'createNewCycle':
        this.selectedPage = 'createNewCycle';
        break;
      case 'editCycle':
        this.selectedPage = 'editCycle';
        break;
    }
    this.showMenuBar = false;
  }

  handleShowList(show: boolean): void {
    this.showList = show;
  }

  handleSelected(item: IDictionaryItem): void {
    this.resultItem$.next(item);
    this.inputControl.setValue(item.CourseNumber);
  }

}
