import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, createPlatform, Inject, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular'
import { AuthenticationResult } from '@azure/msal-browser';
import { IDictionaryItem } from '../features/bislat-container/bislat-container.component';
import { bases, selection } from '../inerfaces/api-interface';
// import {Base} from '../class/Base'
// import { bases } from '../pages/header/img-url';
// import { Course } from '../class/course';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  response: string = '';
  // selection: any;

  constructor(private authService: MsalService, private http: HttpClient) { }

  AddBase(base: IDictionaryItem): string {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    }

    this.http.post("https://index-bislat-back.azurewebsites.net/Iafbase/AddBase", JSON.stringify(base), {
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

  GetBase(): Observable<bases[]> {
    return this.http.get<bases[]>('https:index-bislat-back.azurewebsites.net/Iafbase');
  }

  postCourseSelection(selectionForm: selection): void {
    // this.http.post('https://index-bislat-back.azurewebsites.net/Sort', selectionForm);
  }

  getCourseSelection() {
    // console.log(this.http.get('https:index-bislat-back.azurewebsites.net/Sort'));
  }

  AdBase(base: bases): string {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    }
    this.http.post("https://index-bislat-back.azurewebsites.net/Sort", JSON.stringify(base), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    }).subscribe(data =>
      this.response = data,
      error => this.response = error
    );
    return this.response;
  }

  postRequest(httpURL: string, item: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    }
    this.http.post(httpURL, JSON.stringify(item), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    }).subscribe(data =>
      this.response = data,
      error => this.response = error
    );
    return this.response;
  }
}
