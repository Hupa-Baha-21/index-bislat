import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SecurityMsalService } from 'src/app/services/microsoft-msal/security-msal.service';
import { iCycle, isort } from 'src/app/inerfaces/api-interface';
import { ApiCallsService } from 'src/app/services/api-connection/api-calls.service';
import { FormGroup } from '@angular/forms';
import { Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { IDictionaryItem } from 'src/app/features/bislat-container/bislat-container.component';
import { Observable, of, pipe } from 'rxjs';
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
  previewPopUp: boolean = false;
  information: [{ font: string, text: any }] = [{ font: "11", text: "11" }];
  buttonClicked: boolean = false;

  inputControl: FormControl = new FormControl();
  indexOutput$: Observable<any[]>;
  // indexOutput$: Observable<any[]> = this.apiConnection.GetRequest("https://index-bislat-back.azurewebsites.net/Course");
  selectedItems: [{ gender: string, courses: any[] }];
  showList: boolean = false;
  selectedAvionicsItems: any[] = [];
  selectedMaintenaceItems: any[] = [];
  item: any;

  basesr: any;


  newCycle = new FormGroup({
    name: new FormControl('', Validators.required),
    selectionForm: new FormControl(true)
  });

  constructor(private msal_service: SecurityMsalService, private apiConnection: ApiCallsService, private service: SortCoursesService) {
    this.sorts = this.createSortArray();
    this.courses = this.apiConnection.GetRequest("https://index-bislat-back.azurewebsites.net/Course");
    this.selectedItems = [{ gender: 'Avionics', courses: [] }];
    this.selectedItems.push({ gender: 'Maintenace', courses: [] });

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

    if (!this.selectedAvionicsItems.includes(event) && !this.selectedMaintenaceItems.includes(event)) {
      switch (event.gender) {
        case 'Avionics': this.selectedAvionicsItems.push(event); break;
        case 'Maintenace': this.selectedMaintenaceItems.push(event); break;
      }
    }
  }

  deleteItem(course: any, gender: string) {
    if (gender === 'Avionics') {
      const index = this.selectedAvionicsItems.indexOf(course);
      this.selectedAvionicsItems.splice(index, 1);
    }
    else if (gender === 'Maintenace') {
      const index = this.selectedMaintenaceItems.indexOf(course);
      this.selectedMaintenaceItems.splice(index, 1);
    }
  }

  inputValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.selectedAvionicsItems.length && !this.selectedMaintenaceItems.length) {
        return { forbiddenName: { value: control.value } };
      }
      return null;
    }
  }

  onBlur(): void {
    setTimeout(() => {
      this.showList = false;
    }, 80);
  }

  onFocus(): void {
    this.showList = true;
  }

  createInformationArr() {

    let informationn: [{ font: string, text: any }] = [{ font: "title", text: this.newCycle.controls['name'].value }];

    if (this.selectedMaintenaceItems.length) { informationn.push({ font: "subtitle", text: "אחזקה מתכת/חשמל" }); }
    for (let i = 0; i < this.selectedMaintenaceItems.length; i++) {
      let s: string = this.selectedMaintenaceItems[i].CourseNumber + "- " + this.selectedMaintenaceItems[i].CourseName;
      informationn.push({ font: "text", text: s });
    }

    if (this.selectedAvionicsItems.length) { informationn.push({ font: "subtitle", text: "אוויוניקה" }); }
    for (let i = 0; i < this.selectedAvionicsItems.length; i++) {
      let s: string = this.selectedAvionicsItems[i].CourseNumber + "- " + this.selectedAvionicsItems[i].CourseName;
      informationn.push({ font: "text", text: s });
    }

    if (this.newCycle.controls['selectionForm'].value === true) { informationn.push({ font: "subtitle", text: "נפתחת אפשרות למלא שאלון העדפות" }); }
    else { informationn.push({ font: "subtitle", text: "לא נפתחת אפשרות למלא שאלון העדפות" }); }

    return informationn;
  }

  createNewSycle() {
    if (this.newCycle.valid && (this.selectedAvionicsItems.length + this.selectedMaintenaceItems.length > 2)) {
      this.information = this.createInformationArr();
      console.log(this.selectedAvionicsItems);

      this.item = {
        name: this.newCycle.controls['name'].value,
        // courses: [...this.service.findCourseNumber(this.selectedAvionicsItems), ... this.service.findCourseNumber(this.selectedMaintenaceItems)]
        courses: [...this.service.findCourseNumber(this.selectedAvionicsItems), ... this.service.findCourseNumber(this.selectedMaintenaceItems)]
      }
      this.previewPopUp = true;
    }
  }

  deleteCycle(cycleName: string) {
    this.apiConnection.DeleteRequest('https://index-bislat-back.azurewebsites.net/Sort/' + cycleName);
    this.sorts = this.createSortArray();
  }
}
