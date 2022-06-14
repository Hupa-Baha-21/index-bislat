import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IDictionaryItem } from '../bislat-container.component';


@Component({
  selector: 'app-bislat-list',
  templateUrl: './bislat-list.component.html',
  styleUrls: ['./bislat-list.component.scss']
})
export class BislatListComponent implements OnInit {

  @Input() indexOutput: IDictionaryItem[] | null | undefined;
  @Input() showList: boolean | undefined;

  @Output() selectedItemEmitter = new EventEmitter<IDictionaryItem>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  itemClicked(item: IDictionaryItem) {
    sessionStorage.setItem("selectedItem", item.CourseName);
  }

}

// setTimeout(() => {
//   this.selectedItemEmitter.emit(item);
//   // this.router.navigate(['courseNumber']);
// }, 105);