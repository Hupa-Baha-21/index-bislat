import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavTitles } from 'src/app/pages/header/img-url';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @ViewChild(MatSidenav) snav!: MatSidenav;
  navTitle: string[] = NavTitles;

  constructor() { }

  ngOnInit(): void {
  }
}
