import { Component, OnInit } from '@angular/core';
import { SecurityMsalService } from 'src/app/services/microsoft-msal/security-msal.service';

@Component({
  selector: 'app-block-form',
  templateUrl: './block-form.component.html',
  styleUrls: ['./block-form.component.scss']
})
export class BlockFormComponent implements OnInit {

  constructor(private msal_service: SecurityMsalService) { }

  ngOnInit(): void {
  }

  buttonClicked() {
    this.logIn();
  }

  isLogedIn(): boolean { return this.msal_service.isLogedIn(); };
  logIn() { this.msal_service.logIn(); }
}
