import { Component, Input, OnInit } from '@angular/core';
import { IDictionaryItem } from '../bislat-container.component';
import { ActivatedRoute } from '@angular/router';
import { IDictionary } from '../bislat-container.component';
import * as data from '../../../mock-data.json'
import { SortCoursesService } from '../sort-courses.service';


@Component({
  selector: 'app-bislat-output',
  templateUrl: './bislat-output.component.html',
  styleUrls: ['./bislat-output.component.scss']
})
export class BislatOutputComponent implements OnInit {

  isItemFavorite: boolean;
  isReadMore: boolean = false;

  inputPlaceholder: string = "" + this.route.snapshot.paramMap.get('number');
  dictionaryData: IDictionary = data;
  item: IDictionaryItem;


  constructor(private route: ActivatedRoute, service: SortCoursesService) {

    this.item = service.getSelectedCourse(this.inputPlaceholder);
    this.isItemFavorite = service.isItemFavorite(this.item);
  }
  
  ngOnInit(): void { 
    // this.setValueInPlaceholder();
  }
  
  removeOrAddFavorite(): void {
    
    let favorites: string[] = JSON.parse(localStorage.getItem('courseNumber') || '[]');
    
    if (this.isItemFavorite === false) {
      
      this.isItemFavorite = true;
      favorites.push(this.item.CourseNumber);
    }
    
    else if (this.isItemFavorite === true) {
      
      this.isItemFavorite = false;
      for (let i = 0; i < favorites.length; i++) {
        
        if (favorites[i] === this.item.CourseNumber) {
          favorites.splice(i, 1);
          break;
        }
      }
    }
    
    localStorage.setItem('courseNumber', JSON.stringify(favorites));
  }
  //------------------------------------------------------------------------------------
  
  readMoreClicked() {
    
    if (this.isReadMore === false) { this.isReadMore = true; }
    else if (this.isReadMore === true) { this.isReadMore = false; }
  }
  //------------------------------------------------------------------------------------
  
  // setValueInPlaceholder(): void {
  //   sessionStorage.setItem('ValueInPlaceholder', this.item.CourseNumber);
  // }
  //------------------------------------------------------------------------------------
  
}



// const filteredDictionary: IDictionaryItem[] = keyDictionary.filter(item => item.CourseNumber.includes(this.inputPlaceholder)); 
// return (filteredDictionary);



// findItem() {
  
  //   let tmp1!: IDictionaryItem;
  
  //   if (this.inputPlaceholder) {
    //     const key = this.inputPlaceholder[0];
    //     const keyDictionary: IDictionaryItem[] = this.dictionaryData[key];
    
    //     if (keyDictionary) {
      //       for (let i = 0; i < keyDictionary.length; i++) {
        //         let tmp: IDictionaryItem = keyDictionary[i];
        
        //         if (tmp.CourseNumber === this.inputPlaceholder) { return tmp; }
        //       }
        //     }
        //   }
        //   else {
          //     return tmp1;
          //   }
          //   return tmp1;
          // }
          // //------------------------------------------------------------------------------------
          
          // isFavorite() {
            
            //   let favorites: string[] = JSON.parse(localStorage.getItem('courseNumber') || '[]');
            
            //   for (let i = 0; i < favorites.length; i++) {
              //     if (favorites[i] === this.item.CourseNumber) { return true; }
//   }

//   return false;
// }
//------------------------------------------------------------------------------------




// this.item = this.findItem();
// this.item = SortCoursesService;
// this.isItemFavorite = this.isFavorite();