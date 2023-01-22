import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SecurityMsalService } from 'src/app/services/microsoft-msal/security-msal.service';
import { iCycle, isort } from 'src/app/inerfaces/api-interface';
import { ApiCallsService } from 'src/app/services/api-connection/api-calls.service';
import { FormGroup } from '@angular/forms';
import { Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, pipe } from 'rxjs';
import { searchCourses } from 'src/app/services/api-helpers/search/search-courses.service';
// import { Event } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  showMenuBar: boolean = false;
  sortElemntsProperties: Array<isort[]>;
  page: any = { text: 'מחזורי מיון', url: 'sorts' };

  lastSortExpand: number[] = [0, 0]; // index 0-page sorts, index 1-page archives
  previewPopUp: boolean = false;
  previewPageInformation: [{ font: string, text: any }] = [{ font: "11", text: "11" }];
  buttonClicked: boolean = false;

  inputControl: FormControl = new FormControl();
  indexOutput$: Observable<any[]>;
  showList: boolean = false;

  selectedCourses: any[][] = [[], []] // 0-Avionics, 1-Maintenace
  item: any;

  newCycle = new FormGroup({
    name: new FormControl('', Validators.required),
    showSortOnWeb: new FormControl(false),
    openSelectionForm: new FormControl(false)
  });

  constructor(private msal_service: SecurityMsalService, private apiConnection: ApiCallsService, private service: searchCourses) {

    this.sortElemntsProperties = this.getListPropertiesOfSortElements();
    this.indexOutput$ = this.inputControl.valueChanges.pipe(
      service.getListCourses()
    );
  }
  ngOnInit(): void { }

  isManager(): boolean {
    return this.msal_service.isManager();
  }

  addCourse(event: any) {

    if (!this.selectedCourses[0].includes(event) && !this.selectedCourses[1].includes(event)) {
      switch (event.gender) {
        case 'Avionics': this.selectedCourses[0].push(event); break;
        case 'Maintenace': this.selectedCourses[1].push(event); break;
      }
    }
  }

  deleteCourse(course: any, gender: number) {
    this.lastSortExpand[0] = 0;
    const index = this.selectedCourses[gender].indexOf(course);
    this.selectedCourses[gender].splice(index, 1);
  }

  deleteCycle(cycleName: string, index: number, page: number) {
    this.apiConnection.DeleteRequest('https://index-bislat-back.azurewebsites.net/Sort/' + cycleName);
    this.sortElemntsProperties[page].splice(index, 1);
  }

  clearPage() {
    this.page = { text: 'מחזורי מיון', url: 'sorts' };
    // this.selectedAvionicsItems = [];
    // this.selectedMaintenaceItems = [];
    this.selectedCourses = [[], []];
    this.newCycle.controls['name'].setValue('');
    this.inputControl.setValue('');
    this.newCycle.controls['showSortOnWeb'].setValue(false);
    this.newCycle.controls['openSelectionForm'].setValue(false);
    this.buttonClicked = false;
    this.sortElemntsProperties[0][this.lastSortExpand[0]].isExpand = false;
    this.sortElemntsProperties[1][this.lastSortExpand[1]].isExpand = false;
    this.lastSortExpand = [0, 0];
  }

  onBlur(): void {
    setTimeout(() => {
      this.showList = false;
    }, 80);
  }

  listOnFocus(): void {
    this.showList = true;
  }

  sortOnFocus(index: number, page: number) {

    this.sortElemntsProperties[page][index].isExpand = !this.sortElemntsProperties[page][index].isExpand;
    if (this.lastSortExpand[page] != index) {
      this.sortElemntsProperties[page][this.lastSortExpand[page]].isExpand = false;
      this.lastSortExpand[page] = index;
    }
  }

  // ---------------------------------------- creating ----------------------------------------
  getListPropertiesOfSortElements() {
    const sorts = this.apiConnection.GetRequest("https://index-bislat-back.azurewebsites.net/Sort");
    let sortsProperties: Array<isort[]> = [[], []];

    for (let i = 0; i < sorts.length; i++) {
      switch (sorts[i].status) {
        case 1:
          sortsProperties[0].push({ name: sorts[i].name, isExpand: false });
          break;

        case 2:
          sortsProperties[0].push({ name: sorts[i].name, isExpand: false });
          break;

        case 0:
          sortsProperties[1].push({ name: sorts[i].name, isExpand: false });
          break;
      }
    }
    return sortsProperties;
  }

  createCycleInterface() {
    if (this.newCycle.valid && this.coursesValidator) {
      this.previewPageInformation = this.createPreviewInformation();

      this.item = {
        name: this.newCycle.controls['name'].value,
        status: this.getCycleNumberStatus(),
        courses: [...this.service.findCourseNumber(this.selectedCourses[0]), ... this.service.findCourseNumber(this.selectedCourses[1])]
      }
      this.previewPopUp = true;
    }
  }

  createPreviewInformation() {
    let informationn: [{ font: string, text: any }] = [{ font: "title", text: this.newCycle.controls['name'].value }];

    if (this.selectedCourses[1].length) { informationn.push({ font: "subtitle", text: "אחזקה מתכת/חשמל" }); }
    for (let i = 0; i < this.selectedCourses[1].length; i++) {
      let s: string = this.selectedCourses[1][i].courseNumber + "- " + this.selectedCourses[1][i].courseName;
      informationn.push({ font: "text", text: s });
    }

    if (this.selectedCourses[0].length) { informationn.push({ font: "subtitle", text: "אוויוניקה" }); }
    for (let i = 0; i < this.selectedCourses[0].length; i++) {
      let s: string = this.selectedCourses[0][i].courseNumber + "- " + this.selectedCourses[0][i].courseName;
      informationn.push({ font: "text", text: s });

    }

    if (this.newCycle.controls['showSortOnWeb'].value === true) {
      switch (this.newCycle.controls['openSelectionForm'].value) {
        case true:
          informationn.push({ font: "subtitle", text: "המחזור יוצג באתר ותיפתח אפשרות למלא שאלון העדפות" });
          break;

        case false:
          informationn.push({ font: "subtitle", text: "המחזור יוצג באתר ולא יינתן למלא שאלון העדפות" });
          break;
      }
    }
    else {
      informationn.push({ font: "subtitle", text: "המחזור לא יוצג באתר וישמר בארכיון!" });
    }

    return informationn;
  }

  // ---------------------------------------- validators ----------------------------------------
  inputValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.selectedCourses[0].length && !this.selectedCourses[1].length) {
        return { forbiddenName: { value: control.value } };
      }
      return null;
    }
  }

  coursesValidator(): boolean {
    return (!this.newCycle.controls['name'].valid || (this.selectedCourses[1].length < 3 && this.selectedCourses[1].length > 0) ||
      (this.selectedCourses[1].length < 3 && this.selectedCourses[1].length > 0) || (this.selectedCourses[0].length === 0 &&
        this.selectedCourses[1].length === 0)) && this.buttonClicked;
  }

  getCycleNumberStatus() {
    let selectionFormStatus = this.newCycle.controls['openSelectionForm'].value;
    let showCycleOnWebStatus = this.newCycle.controls['showSortOnWeb'].value;
    // 0-archives, 1-show, 2-open selection form,

    if (!selectionFormStatus && !showCycleOnWebStatus) { return 0; }
    if (!selectionFormStatus && showCycleOnWebStatus) { return 1; }
    if (selectionFormStatus && showCycleOnWebStatus) { return 2; }

    return;
  }
  addItem(event: any) {
    if (event.status != 0) {
      this.sortElemntsProperties[0].push(event);
    }
    else if (event.status === 0) {
      this.sortElemntsProperties[1].push(event);
    }
    this.clearPage();

    // if (event.status != 0) { this.sortElemntsProperties.push(event); }
    // else if (event.status === 1 || event.status === 2) {
    //   this.archivesSorts[page].push(event);
    // }
    // this.clearPage();
  }
}
