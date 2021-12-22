import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { imgUrls } from './img-url';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  imgArr : string[] = [];
  imgUrl = "'../../../assets/images/startImg1.jpg'";
  countImg: number = 0;
  slideShowInterval = interval(4000);

  constructor() { this.imgArr = imgUrls; }

  ngOnInit(): void {
    
    this.slideShowInterval.subscribe(() => this.setNextImage());
  }

  setNextImage(): void {

    if(this.countImg == (imgUrls.length-1)) { this.countImg = 0; }
    else{ this.countImg = this.countImg + 1; }
    this.imgUrl = imgUrls[this.countImg];
  }

  getNextImg(): string{ return this.imgUrl; } 
}
