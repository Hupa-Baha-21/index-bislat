import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { setTimeout } from 'timers';

@Component({
  selector: 'app-bislat-input',
  templateUrl: './bislat-input.component.html',
  styleUrls: ['./bislat-input.component.scss']
})
export class BislatInputComponent implements OnInit {

  @Input() inputControl: FormControl | undefined;
  @Output() showListEmitter = new EventEmitter<boolean>();
  @Output() clearEmitter = new EventEmitter<void>();
  inputPlaceholder: string = "";

  constructor() { setTimeout(() => { this.inputPlaceholder = "הקלד כאן את מספר הקורס" }, 2000); }

  ngOnInit(): void {
  }

  onBlur(): void {
    setTimeout(() => {
      this.showListEmitter.emit(false);
    }, 105);
  }

  onFocus(): void {
    this.showListEmitter.emit(true);
  }

  onClear(): void {
    this.clearEmitter.emit();
  }
}
