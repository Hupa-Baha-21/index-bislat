// import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormArray, RequiredValidator } from '@angular/forms';
import { selectionPage, option } from '../img-url';
import { iSelectionForm, isort, iCycle, iCourseForSelectionPage } from 'src/app/inerfaces/api-interface';
import { ApiCallsService } from 'src/app/services/api-connection/api-calls.service';
import { SecurityMsalService } from 'src/app/services/microsoft-msal/security-msal.service';
import { ApiHelpersService } from 'src/app/services/api-helpers/api-helpers.service';

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
  ExpansionValidatorLocation: number[] = []; //index - optionIndex, value - expansionIndex
  allCourses: string[] = [];
  errorNote: boolean = false;
  note: string = '  ';

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

  constructor(private msalService: SecurityMsalService, private apiConnection: ApiCallsService, private apiHelper: ApiHelpersService) {
    this.selectionPages[0].formGroup = this.selectionPage1Form;
    this.selectionPages[0].func = this.moveNextPage;
    this.selectionPages[1].formGroup = this.selectionPage2Form;
    this.selectionPages[1].func = this.sendForm;
    selectionPage[0].items[0].selectOptions = apiHelper.getListOfCycleName();
    this.selectionPage2Form.controls['firstOption'].addValidators(this.selectOptionsValidator(1));
    this.selectionPage2Form.controls['secondOption'].addValidators(this.selectOptionsValidator(2));
    this.selectionPage2Form.controls['thirdOption'].addValidators(this.selectOptionsValidator(3));
  }

  ngOnInit(): void {

    if (localStorage.getItem("biockForm")) { this.blockForm = true; }
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

  selectOptionsValidator(select: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      switch (select) {
        case 1:
          if (control.value === this.selectionPage2Form.controls['secondOption'].value || control.value === this.selectionPage2Form.controls['thirdOption'].value || control.value === '') {
            return { forbiddenName: { value: control.value } }
          }
          break;
        case 2:
          if (control.value === this.selectionPage2Form.controls['firstOption'].value || control.value === this.selectionPage2Form.controls['thirdOption'].value || control.value === '') {
            return { forbiddenName: { value: control.value } }
          }
          break
        case 3:
          if (control.value === this.selectionPage2Form.controls['firstOption'].value || control.value === this.selectionPage2Form.controls['secondOption'].value || control.value === '') {
            return { forbiddenName: { value: control.value } }
          }
          break;
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
      this.allCourses = this.apiHelper.getCyclesListOfCourseName(this.selectionPage1Form.controls["cycleInput"].value);
      this.pageNumber = 2;
      this.buttonClicked = false;
    }
  }

  sendForm(): void {
    this.buttonClicked = true;

    if (this.selectionPage2Form.valid) {
      this.pageNumber = 3;
      console.log(this.createSelectionInterface());
      this.apiConnection.postRequest("https://index-bislat-back.azurewebsites.net/Choise/Addchoise", this.createSelectionInterface());
      localStorage.setItem("blockForm", "true");
    }
  }

  createSelectionInterface() {
    let tmpPage1 = this.selectionPage1Form.controls;
    let tmpPage2 = this.selectionPage2Form.controls;
    let tmpOption: Array<Array<option>> = [];

    if (this.selectionPages[1].items[1].selectionsOptions && this.selectionPages[1].items[3].selectionsOptions && this.selectionPages[1].items[5].selectionsOptions) {
      tmpOption[0] = this.selectionPages[1].items[1].selectionsOptions;
      tmpOption[1] = this.selectionPages[1].items[3].selectionsOptions;
      tmpOption[2] = this.selectionPages[1].items[5].selectionsOptions;
    }

    let formSelection: iSelectionForm = {
      title: tmpPage1['cycleInput'].value,
      gender: tmpPage1['genderInput'].value,
      fullName: tmpPage1['nameInput'].value,
      id: tmpPage1['idInput'].value,
      sortFrame: tmpPage1['sortNumberInput'].value,
      first: tmpPage2['firstOption'].value,
      resonef: this.convertArrayResonesToString(tmpPage2['firstCauses'].value, tmpOption[0]),
      second: tmpPage2['secondOption'].value,
      resones: this.convertArrayResonesToString(tmpPage2['secondCauses'].value, tmpOption[1]),
      third: tmpPage2['thirdOption'].value,
      resonet: this.convertArrayResonesToString(tmpPage2['thirdCauses'].value, tmpOption[2])
    }
    return formSelection;
  }

  convertArrayResonesToString(formValues: any[], optionsInfo: option[]): string {

    let s: string = '';

    while (formValues.indexOf(true) != -1) {
      let selecedOptionIndex = formValues.indexOf(true);
      s += optionsInfo[selecedOptionIndex].text;

      if (optionsInfo[selecedOptionIndex].expansion) {
        s += ": " + formValues[this.ExpansionValidatorLocation[selecedOptionIndex]];
      }
      formValues[selecedOptionIndex] = 'false';
      if (formValues.includes(true)) { s += ", "; }
    }
    return s;
  }
}
