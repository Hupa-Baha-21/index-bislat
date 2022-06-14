import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-bislat-input',
  templateUrl: './bislat-input.component.html',
  styleUrls: ['./bislat-input.component.scss']
})
export class BislatInputComponent implements OnInit {

  @Input() inputControl: FormControl | undefined;
  @Output() showListEmitter = new EventEmitter<boolean>();
  @Output() clearEmitter = new EventEmitter<void>();
  inputPlaceholder: string = " ";

  isFirstVisit: boolean = true;
  placeholderTime: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (sessionStorage.getItem("firstVisit")) {
      this.isFirstVisit = false;
      this.placeholderTime = 0;
    }
    else {
      sessionStorage.setItem("firstVisit", "false");
      this.placeholderTime = 2000;
    }

    setTimeout(() => { this.inputPlaceholder = "הקלד כאן את מספר המקצוע" }, this.placeholderTime);
  }

  onBlur(): void {
    setTimeout(() => {
      this.showListEmitter.emit(false);
    }, 80);
  }

  onFocus(): void {
    this.showListEmitter.emit(true);
  }

  onClear(): void {
    this.clearEmitter.emit();
  }
}
