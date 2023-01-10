import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-connection/api-calls.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() information: [{ font: string, text: string }] | undefined;
  @Input() item: any | undefined;
  @Output() popUp = new EventEmitter<boolean>();

  constructor(private apiConnection: ApiCallsService) { }

  ngOnInit(): void {
  }

  sendItemToAPI() {
    this.apiConnection.postRequest('https://index-bislat-back.azurewebsites.net/Sort', this.item);
    this.popUp.emit(false);
  }

}
