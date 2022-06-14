import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { imgUrls } from './img-url';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  images = imgUrls;
  imgURL1: string = "";
  imgURL2: string = "";
  imgURL3: string = "";
  imgCount: number = 1;
  index: number = 0;
  threeImagesPosition: boolean = false;
  slideShowInterval = interval(5000);
  clicks = fromEvent(window, 'resize');

  constructor() {
    
    if((window.innerWidth / window.innerHeight) < 1) { this.threeImagesPosition = false; }
    else { this.threeImagesPosition = true; }
    
    this.restartImages();
    this.slideShowInterval.subscribe(() => this.setNextImage());
  }
  
  ngOnInit(): void {
    
    // this.lockScreen();

    this.clicks.subscribe(() => {
      if(this.isScreenChanged()) { this.restartImages(); }
    });
  }
  
  restartImages(): void{

    this.imgURL2 = "";
    this.imgURL3 = "";
    this.imgCount = 1;

    this.setFirstIamge();

    for(let i = 1; i < 3 && this.threeImagesPosition; i++){
      this.setNextImage();
    }
  }

  isScreenChanged(): boolean{

    if((window.innerWidth / window.innerHeight) > 1 && this.threeImagesPosition){ return false; }
    if((window.innerWidth / window.innerHeight) < 1 && this.threeImagesPosition === false){ return false; }

    if(this.threeImagesPosition){ this.threeImagesPosition = false; }
    else{ this.threeImagesPosition = true; }
    return true;
  }
  
  setFirstIamge(): void{
    let random = Math.floor(Math.random() * (imgUrls.length - 1));
    this.imgURL1 = imgUrls[random];
    this.imgCount = 1;
    this.index = random;
  }

  setNextImage(): void{

    if (this.index === (imgUrls.length - 1)) { this.index = 0; }
    else { this.index++; }
    
    if(this.threeImagesPosition){
      if(this.imgCount === 3){ this.imgCount = 1; }
      else{ this.imgCount++; }
    }

    if(this.imgCount === 1){ this.imgURL1 = imgUrls[this.index]; }
    if(this.imgCount === 2){ this.imgURL2 = imgUrls[this.index]; }
    if(this.imgCount === 3){ this.imgURL3 = imgUrls[this.index]; }
  }
}





// getNextImg(): string { 
//   return this.imgUrl; 
// }


  // imgArr: string[] = [];
  // arr: string[] = [];
  // imgUrl = "";
  // countImg: number = 0;
  // countIndex: number = 0;
  // intervalTime: number;


// setNextImage() {

//   if (document.documentElement.clientWidth >= 1000) {
//     if (this.countIndex === 2) { this.countIndex = 0; }
//     else { this.countIndex++; }
//   }
//   else {
//     this.countIndex = 0;
//     this.arr[1] = "";
//     this.arr[2] = "";
//   }

//   if (this.countImg == (imgUrls.length - 1)) { this.countImg = 0; }
//   else { this.countImg = this.countImg + 1; }

//   this.arr[this.countIndex] = imgUrls[this.countImg];
// }




// createImgArr() {
  
//   const width = document.documentElement.clientWidth;
//   this.arr[0] = this.setFirstImage();
  
//   for (let i = 1; width >=1000 && i < 3; i++) {
//     this.setNextImage();
//   }
// }

// setFirstImage() {
//   let r = Math.floor(Math.random() * (imgUrls.length - 1));
//   this.imgUrl = imgUrls[r];
//   this.countImg = r;
//   return this.imgUrl;
// }







// setNextImage(){

//   if (this.countImg == (imgUrls.length - 1)) { this.countImg = 0; }
//   else { this.countImg = this.countImg + 1; }
//   this.imgUrl = imgUrls[this.countImg];
//   return this.imgUrl;
// }

// setIntervalTime(): number {
  //   if (document.documentElement.clientWidth >= 800) { return 4000; }
  //   return 6000;
  // }
  
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