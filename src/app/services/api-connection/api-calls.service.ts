import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, createPlatform, Inject, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular'
import { AuthenticationResult } from '@azure/msal-browser';
import { IDictionaryItem } from '../../features/bislat-container/bislat-container.component';
import { bases, iSelectionForm } from '../../inerfaces/api-interface';


@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  response: string = '';
  // selection: any;

  constructor(private authService: MsalService, private http: HttpClient) { }

  // AddBase(base: IDictionaryItem): string {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //     responseType: 'text',
  //   }

  //   this.http.post("https://index-bislat-back.azurewebsites.net/Iafbase/AddBase", JSON.stringify(base), {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //     responseType: 'text',
  //   }
  //   ).subscribe(
  //     data => this.response = data,
  //     error => this.response = error
  //   );
  //   console.log(this.response);
  //   return this.response;
  // }

  // GetBase(): Observable<bases[]> {
  //   return this.http.get<bases[]>('https:index-bislat-back.azurewebsites.net/Iafbase');
  // }

  // AdBase(base: bases): string {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //     responseType: 'text',
  //   }
  //   this.http.post("https://index-bislat-back.azurewebsites.net/Sort", JSON.stringify(base), {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //     responseType: 'text',
  //   }).subscribe(data =>
  //     this.response = data,
  //     error => this.response = error
  //   );
  //   return this.response;
  // }


  postRequest(httpURL: string, item: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    }
    this.http.post(httpURL, JSON.stringify(item), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    }
    ).subscribe(
      data => this.response = data,
      error => this.response = error
    );
    console.log(this.response);
    return this.response;
  }


  GetRequest(httpURL: string) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", httpURL, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
  }

  DeleteRequest(httpURL: string) {
    this.http.delete(httpURL, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' },
    ).subscribe(
      data => this.response = data,
      error => this.response = error
    );
    console.log(this.response);
    return this.response;
  }

}
