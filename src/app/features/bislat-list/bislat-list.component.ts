import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IDictionaryItem } from '../bislat-container/bislat-container.component';
import { iCourseForSelectionPage } from 'src/app/inerfaces/api-interface';
import { IconResolver } from '@angular/material/icon';


@Component({
  selector: 'app-bislat-list',
  templateUrl: './bislat-list.component.html',
  styleUrls: ['./bislat-list.component.scss']
})
export class BislatListComponent implements OnInit {

  @Input() indexOutput: iCourseForSelectionPage[] | null | undefined;
  @Input() page: string | undefined;
  @Input() showList: boolean | undefined;

  @Output() selectedItemEmitter = new EventEmitter<iCourseForSelectionPage>();
  // @Output() selectedItem = new EventEmitter<

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  itemClicked(item: iCourseForSelectionPage) {
    if (this.page === 'homePage') {
      sessionStorage.setItem("selectedItem", item.courseName);
      window.location.href = '/course/' + item.courseNumber;
    }
    else if (this.page === 'managementPage') {
      this.selectedItemEmitter.emit(item);
    }
  }

}