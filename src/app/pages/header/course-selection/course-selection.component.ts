import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { selectionPage } from '../img-url';


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

  selectionPage1Form = new FormGroup({

    cycleInput: new FormControl('', Validators.required),
    nameInput: new FormControl('', Validators.required),
    idInput: new FormControl('', this.idValidator()),
    sortNumberInput: new FormControl('', this.sortValidator()),
    genderInput: new FormControl('', Validators.required)
  })

  selectionPage2Form = new FormGroup({

    firstOption: new FormControl('', Validators.required),
    // firstCause: new FormControl('', this.causeValidator),
    secondOption: new FormControl('', Validators.required),
    // secondCause: new FormControl('', this.causeValidator),
    thirdOption: new FormControl('', Validators.required),
    // thirdCause: new FormControl('', this.causeValidator)
  })

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("blockForm")) {
      this.blockForm = true;
    }

    if (this.pageNumber === 3) {
      this.blockForm = true;
    }

    this.selectionPages[0].formGroup = this.selectionPage1Form;
    this.selectionPages[0].func = this.moveNextPage;
    this.selectionPages[1].formGroup = this.selectionPage2Form;
    this.selectionPages[1].func = this.sendForm;
  }

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

  sortValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isNaN(control.value) || control.value === "") {
        return { forbiddenName: { value: control.value } };
      }
      return null;
    }
  }

  causeValidator() {
    console.log(this.causeArr.includes(true));
    return (this.causeArr.includes(true));
  }

  cause(index: number, checkbox: any): void {
    this.causeArr[index] = checkbox.checked;
  }

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
    // console.log("send form");

    if (this.selectionPage2Form.valid && this.causeValidator()) {
      localStorage.setItem("blockForm", "true");
      this.pageNumber = 3;
    }
  }
}
