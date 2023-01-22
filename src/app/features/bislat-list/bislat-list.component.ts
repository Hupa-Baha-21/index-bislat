import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IDictionaryItem } from '../bislat-container/bislat-container.component';
import { iCourseForSelectionPage } from 'src/app/inerfaces/api-interface';
import { IconResolver } from '@angular/material/icon';
import { ApiCallsService } from 'src/app/services/api-connection/api-calls.service';


@Component({
  selector: 'app-bislat-list',
  templateUrl: './bislat-list.component.html',
  styleUrls: ['./bislat-list.component.scss']
})
export class BislatListComponent implements OnInit {

  @Input() indexOutput: any[] | null | undefined;
  @Input() page: string | undefined;
  @Input() showList: boolean | undefined;

  @Output() selectedItemEmitter = new EventEmitter<iCourseForSelectionPage>();

  constructor(private router: Router, private apiConnection: ApiCallsService) {
  }

  ngOnInit(): void {
  }

  itemClicked(item: any) {
    if (this.page === 'homePage') {
      sessionStorage.setItem("selectedItem", item.courseName);
      window.location.href = '/course/' + item.courseNumber;
    }
    else if (this.page === 'managementPage') {
      this.selectedItemEmitter.emit(item);
    }
  }

}