import { Component, OnInit } from '@angular/core';
import { SecurityMsalService } from 'src/app/services/security-msal.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-secret-page',
  templateUrl: './secret-page.component.html',
  styleUrls: ['./secret-page.component.scss']
})
export class SecretPageComponent implements OnInit {

  @Input() locationHref: string | undefined;

  constructor(private msal_service: SecurityMsalService) { }

  ngOnInit(): void {


    //  window.location.href = this.locationHref + '/homePage';
  }

}
