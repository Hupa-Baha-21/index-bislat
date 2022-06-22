import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.scss']
})
export class CourseSelectionComponent implements OnInit {

  pageNumber: number = 1;
  blockForm: boolean = false;
  buttonClicked: boolean = false;

  selectionPage1Form = new FormGroup({

    cycleInput: new FormControl('', Validators.required),
    nameInput: new FormControl('', Validators.required),
    idInput: new FormControl('', this.idValidator()),
    sortNumberInput: new FormControl('', this.sortValidator())
  })

  selectionPage2Form = new FormGroup({

    firstOption: new FormControl('', Validators.required),
    secondOption: new FormControl('', Validators.required),
    thirdOption: new FormControl('', Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("blockForm")) {
      this.blockForm = true;
    }

    if (this.pageNumber === 3) {
      this.blockForm = true;
    }
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
      if (control.value.length != 9 || isNaN(control.value)) {
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

  moveNextPage(): void {
    this.buttonClicked = true;

    if (this.selectionPage1Form.valid) {
      this.pageNumber = 2;
      this.buttonClicked = false;
    }
  }

  sendForm(): void {
    this.buttonClicked = true;

    if (this.selectionPage2Form.valid) {
      localStorage.setItem("blockForm", "true");
      this.pageNumber = 3;
      // console.log(this.selectionPage1Form.value);
    }
  }
}
