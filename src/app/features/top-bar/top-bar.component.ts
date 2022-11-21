import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavTitles_logedIn, managerPage, managerPages } from 'src/app/pages/header/img-url';
import { SecurityMsalService } from 'src/app/services/security-msal.service';



@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @ViewChild(MatSidenav) snav!: MatSidenav;
  selectedPage: managerPage;
  NavTitles: string[];


  constructor(private msal_service: SecurityMsalService) {
    this.selectedPage = managerPages[0];
    this.NavTitles = NavTitles_logedIn;
  }

  ngOnInit(): void {
  }

  pageClicked(index: number) {
    this.selectedPage = managerPages[index];
    this.snav.opened = false;
  }

  logOut() { this.msal_service.logOut(); }
  isManager(): boolean { return this.msal_service.isManager(); }
}
