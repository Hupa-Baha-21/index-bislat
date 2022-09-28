import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
// import { from } from 'rxjs';
import { NavTitles, managerPage, managerPages } from 'src/app/pages/header/img-url';
import { EventEmitter } from '@angular/core';
// import { NavTitles } from 'src/app/pages/header/img-url';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @ViewChild(MatSidenav) snav!: MatSidenav;
  selectedPage: managerPage = managerPages[1];
  navTitle: string[] = NavTitles;


  constructor() { }

  ngOnInit(): void {
  }

  pageClicked(index: number) {
    this.selectedPage = managerPages[index];
    this.snav.opened = false;
  }

}
