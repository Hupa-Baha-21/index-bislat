import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SecurityMsalService } from 'src/app/services/microsoft-msal/security-msal.service';
import { iCycle, isort } from 'src/app/inerfaces/api-interface';
import { ApiCallsService } from 'src/app/services/api-connection/api-calls.service';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { IDictionaryItem } from 'src/app/features/bislat-container/bislat-container.component';
import { Observable } from 'rxjs';
import { SortCoursesService } from 'src/app/services/sort-courses.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  showMenuBar: boolean = false;
  selectedPage: string = "createNewCycle";
  page: string = 'home';

  sorts: isort[];
  courses;

  inputControl: FormControl = new FormControl();
  indexOutput$: Observable<any[]> = this.apiConnection.GetRequest("https://index-bislat-back.azurewebsites.net/Course");
  selectedItems: any[] = [];
  showList: boolean = false;


  basesr: any;


  newCycle = new FormGroup({
    name: new FormControl('', Validators.required),
  });


  constructor(private msal_service: SecurityMsalService, private apiConnection: ApiCallsService, service: SortCoursesService) {
    this.sorts = this.createSortArray();
    this.courses = this.apiConnection.GetRequest("https://index-bislat-back.azurewebsites.net/Course");

    this.indexOutput$ = this.inputControl.valueChanges.pipe(
      service.getListCourses()
    );
  }

  ngOnInit(): void { }


  isManager(): boolean { return this.msal_service.isManager(); }

  createSortArray() {
    const sortsName = this.apiConnection.GetRequest("https://index-bislat-back.azurewebsites.net/Sort");
    let sortArr: isort[] = [];

    for (let i = 0; i < sortsName.length; i++) {
      sortArr.push({ name: sortsName[i].name, isExpand: false });
    }
    return sortArr;
  }

  addNewItem(event: any) {
    this.selectedItems.push(event);
    this.inputControl.setValue('');
    console.log(this.selectedItems);
  }

  onBlur(): void {
    setTimeout(() => {
      this.showList = false;

    }, 80);
  }

  onFocus(): void {
    this.showList = true;
  }
}
