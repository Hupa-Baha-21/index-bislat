import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-connection/api-calls.service';
import { SortingCyclePipe } from 'src/app/pipes/sorting-cycle/sorting-cycle.pipe';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() newCycleInterface: any | undefined;
  @Input() information: [{ font: string, text: string }] | undefined;

  @Output() popUp = new EventEmitter<boolean>();
  @Output() page = new EventEmitter<string>();
  @Output() sorstingCycle = new EventEmitter<any>();

  constructor(private cyclePipe: SortingCyclePipe) { }

  ngOnInit(): void {
  }

  addSortingCycle() {
    this.popUp.emit(false);
    this.page.emit('sorts')
    this.sorstingCycle.emit(this.cyclePipe.transform(this.newCycleInterface));
  }
}
