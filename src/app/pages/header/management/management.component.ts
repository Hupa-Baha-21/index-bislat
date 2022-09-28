import { Component, OnInit, ViewChild } from '@angular/core';
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
  selectedPage: string = "createNewCycle";

  inputControl: FormControl = new FormControl();

  constructor(service: SortCoursesService) { }

  ngOnInit(): void {
  }


  // menuCliked(): boolean {
  //   if (!this.showMenuBar) {
  //     this.showMenuBar = true;
  //     return true;
  //   }
  //   else {
  //     this.showMenuBar = false;
  //     return false;
  //   }
  // }


  // changePage(pageName: string): void {

  //   switch (pageName) {
  //     case 'selectionForm':
  //       this.selectedPage = 'selectionForm';
  //       break;
  //     case 'createNewCycle':
  //       this.selectedPage = 'createNewCycle';
  //       break;
  //     case 'editCycle':
  //       this.selectedPage = 'editCycle';
  //       break;
  //   }
  //   this.showMenuBar = false;
  // }
}
