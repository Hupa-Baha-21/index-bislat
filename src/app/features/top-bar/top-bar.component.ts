import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavTitles_logedIn, navOptions, managerPage, managerPages } from 'src/app/pages/header/img-url';
import { SecurityMsalService } from 'src/app/services/microsoft-msal/security-msal.service';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @ViewChild(MatSidenav) snav!: MatSidenav;
  @Output() selectedPage = new EventEmitter<any>();
  // selectedPage: managerPage;
  NavTitles: any[];


  constructor(private msal_service: SecurityMsalService) {
    // this.selectedPage = managerPages[0];
    this.NavTitles = navOptions;
  }

  ngOnInit(): void {
  }

  pageClicked(pageURL: any) {
    this.snav.opened = false;
    this.selectedPage.emit(pageURL);
  }

  logOut() { this.msal_service.logOut(); }
  isManager(): boolean { return this.msal_service.isManager(); }
}
