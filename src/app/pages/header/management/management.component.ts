import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { IDictionaryItem } from 'src/app/features/bislat-container/bislat-container.component';
// import { SortCoursesService } from 'src/app/services/sort-courses.service';
// import { Observable, Subject } from 'rxjs';
// import { EventEmitter, Output } from '@angular/core';
// import { MsalService } from '@azure/msal-angular';
// import { AuthenticationHeaderParser, AuthenticationResult } from '@azure/msal-browser';
// import { PostService } from 'src/app/services/post.service';
// import { ApiCallsService } from 'src/app/services/api-calls.service';
import { SecurityMsalService } from 'src/app/services/security-msal.service';
// import { bases } from 'src/app/inerfaces/api-interface';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  showMenuBar: boolean = false;
  selectedPage: string = "createNewCycle";

  basesr: any;

  inputControl: FormControl = new FormControl();

  constructor(private msal_service: SecurityMsalService) { }

  ngOnInit(): void { }

  isManager(): boolean { return this.msal_service.isManager(); }
}
