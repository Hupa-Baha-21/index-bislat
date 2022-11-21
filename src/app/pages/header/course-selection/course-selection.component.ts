// import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormArray, RequiredValidator } from '@angular/forms';
import { selectionPage } from '../img-url';
import { ApiCallsService } from 'src/app/services/api-calls.service';
import { SecurityMsalService } from 'src/app/services/security-msal.service';
// import { bases } from 'src/app/inerfaces/api-interface';
// import { ChangeDetectionStrategy } from '@angular/compiler';
// import { numbers } from '@material/list';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.scss']
})
export class CourseSelectionComponent implements OnInit {

  pageNumber: number = 1;
  blockForm: boolean = false;
  buttonClicked: boolean = false;
  selectionPages = selectionPage;
  causeArr: boolean[] = [];
  expansionArr: string[] = [];
  ExpansionValidatorLocation: number[] = []; //index - optionIndex, value - expansionIndex

  selectionPage1Form = new FormGroup({
    cycleInput: new FormControl('', Validators.required),
    nameInput: new FormControl('', Validators.required),
    idInput: new FormControl('', this.idValidator()),
    sortNumberInput: new FormControl('', this.sortValidator()),
    genderInput: new FormControl('', Validators.required)
  });

  selectionPage2Form = new FormGroup({
    firstOption: new FormControl('', Validators.required),
    firstCauses: new FormArray([
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
      new FormControl('')], this.formArrValidator(4)),
    secondOption: new FormControl('', Validators.required),
    secondCauses: new FormArray([
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
      new FormControl('')], this.formArrValidator(4)),
    thirdOption: new FormControl('', Validators.required),
    thirdCauses: new FormArray([
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
      new FormControl('')], this.formArrValidator(4))
  });

  constructor(private msalService: SecurityMsalService) {
    this.selectionPages[0].formGroup = this.selectionPage1Form;
    this.selectionPages[0].func = this.moveNextPage;
    this.selectionPages[1].formGroup = this.selectionPage2Form;
    this.selectionPages[1].func = this.sendForm;
  }

  ngOnInit(): void {

    if (localStorage.getItem("blockForm")) { this.blockForm = true; }
    if (this.pageNumber === 3) { this.blockForm = true; }
  }

  addAndRemoveInput(isExpansion: boolean, isChecked: boolean, formName: string, option: number) {

    if (isExpansion) {
      const formGroupExpansion = (this.selectionPage2Form.get(formName) as FormArray);

      if (isChecked) {
        formGroupExpansion.push(new FormControl());
        this.ExpansionValidatorLocation[option] = (formGroupExpansion.length - 1);
      }
      else if (!isChecked) {
        formGroupExpansion.removeAt(this.ExpansionValidatorLocation[option]);
        this.ExpansionValidatorLocation.splice(option, 1);
      }
    }
  }

  isLogedIn(): boolean { return (this.msalService.isLogedIn()); }

  //---------------------------------- validators ----------------------------------
  isValid(controlName: string): boolean | undefined {
    if (this.pageNumber === 1) {
      return !this.buttonClicked || this.selectionPage1Form.get(controlName)?.valid;
    }
    else {
      return !this.buttonClicked || this.selectionPage2Form.get(controlName)?.valid;
    }
  }

  idValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if ((control.value.length != 8 && control.value.length != 9) || isNaN(control.value)) {
        return { forbiddenName: { value: control.value } };
      }
      return null;
    }
  }

  formArrValidator(selectionsLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (!control.value.includes(true) || control.value.includes("", selectionsLength) || control.value.includes(null, selectionsLength)) {
        return { forbiddenName: { value: control.value } };
      }
      return null;
    }
  }

  sortValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isNaN(control.value) || control.value === "") {
        return { forbiddenName: { value: control.value } };
      }
      return null;
    }
  }
  //--------------------------

  submitForm(index: number): void {
    if (index === 0) { this.moveNextPage(); }
    if (index === 1) { this.sendForm(); }
  }

  moveNextPage(): void {
    this.buttonClicked = true;

    if (this.selectionPages[0].formGroup?.valid) {
      this.pageNumber = 2;
      this.buttonClicked = false;
    }
  }

  sendForm(): void {
    this.buttonClicked = true;
    this.createarr();




    if (this.selectionPage2Form.valid) {
      localStorage.setItem("blockForm", "true");
      // let l = this.selectionPage1Form.map
      // this.form.controls['your form control name'].value
      // let arrr: any[];
      // let tmp = (item => (" " + item.CourseName).includes(Arr[y].CourseName));
      // this.selectionPage1Form((sele.value) => arrr = b )
      // this.service.GetBase().subscribe((bases) => this.basesr = bases) 
      this.pageNumber = 3;
      // this.api_service.postCourseSelection({ cycleName: 'cycletry1', fullName: 'try', idNumber: '', sortNumber: 2, gender: '', firstSelection: '', resoneF: '', exapmleF: '', secondSelection: '', resoneS: '', exapmleS: '', thirdSelection: '', resoneT: '', exapmleT: '' });
    }
  }

  createarr() {
    let arr = [];

    for (let i = 0; i < this.selectionPages[0].items.length; i++) {
      arr.push(this.selectionPage1Form.controls[this.selectionPages[0].items[i].formControlName].value);
    }

    for (let i = 0; i < this.selectionPages[1].items.length; i++) {

      let formValue = this.selectionPage2Form.controls[this.selectionPages[1].items[i].formControlName].value;

      if (this.selectionPages[1].items[i].selectionsOptions) {
        formValue = "";

        let arr1 = this.selectionPages[1].items[i].selectionsOptions?.map(item => item.text);
        let arr2 = (this.selectionPage2Form.controls[this.selectionPages[1].items[i].formControlName].value as Array<string>);

        if (arr1) {
          for (let y = 0; y < arr1.length; y++) {
            if (arr2[y] && !this.ExpansionValidatorLocation[y]) { formValue = formValue + arr1[y] + ", "; }
            else if (arr2[y] && this.ExpansionValidatorLocation[y]) { formValue = formValue + arr1[y] + ": " + arr2[this.ExpansionValidatorLocation[y]]; + ", " }
          }
        }
        // formValue[(formValue.length - 1)] = "";
      }
      arr.push(formValue);
    }

    console.log(arr);
  }
}
