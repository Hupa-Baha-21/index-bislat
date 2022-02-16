import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { imgUrls } from './img-url';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  imgArr: string[] = [];
  imgUrl = "";
  countImg: number = 0;
  slideShowInterval = interval(6000);

  constructor() { this.imgArr = imgUrls; }

  ngOnInit(): void {
    this.setFirstImage();
    this.slideShowInterval.subscribe(() => this.setNextImage());
  }

  setNextImage(): void {

    if (this.countImg == (imgUrls.length - 1)) { this.countImg = 0; }
    else { this.countImg = this.countImg + 1; }
    this.imgUrl = imgUrls[this.countImg];
  }

  setFirstImage(): void {
    let r = Math.floor(Math.random() * (imgUrls.length - 1));
    this.imgUrl = imgUrls[r];
    this.countImg = r;
  }


  getNextImg(): string { return this.imgUrl; }
}





// setNextImage(): void {
//   let tmpArr: boolean[] = [];

//   if (this.countImg == (imgUrls.length - 1)) {
//     this.countImg = 0;
//     this.lastImg = this.imgUrl;
//     tmpArr = [];
//   }

//   let r = Math.floor(Math.random() * (imgUrls.length - 1));

//   while (tmpArr[r] === true || imgUrls[r] === this.lastImg) { r = Math.floor(Math.random() * (imgUrls.length - 1)); }


//   this.imgUrl = imgUrls[r];
//   tmpArr[r] = true;
//   this.countImg++;
// }