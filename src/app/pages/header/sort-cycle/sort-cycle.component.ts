import { Component, OnInit } from '@angular/core';
import { listAvionics, listMaintenace } from '../img-url';

@Component({
  selector: 'app-sort-cycle',
  templateUrl: './sort-cycle.component.html',
  styleUrls: ['./sort-cycle.component.scss']
})
export class SortCycleComponent implements OnInit {


  listAvionics = listAvionics;
  listMaintenace = listMaintenace;

  constructor() { }

  ngOnInit(): void {
  }

  itemClicked(item: any) {
    console.log(item);
    sessionStorage.setItem("selectedItem", item.courseName);
    window.location.href = '/course/' + item.courseNumber;
  }

}
