import { isPromise } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { IDictionaryItem } from 'src/app/features/bislat-container/bislat-container.component';
import { IDictionary } from 'src/app/features/bislat-container/bislat-container.component';
import * as data from '../../../mock-data.json';
import { searchCourses } from 'src/app/services/api-helpers/search/search-courses.service';


@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit {

  // dictionaryData: IDictionary = data;
  items: any[] = [];
  routing: string = "/course/";
  ifRouting: boolean = true;
  
  constructor(service: searchCourses) {
    // this.items = service.findFavoriteCourses();
    this.items = service.getClearedSelectedCourses(JSON.parse(localStorage.getItem('courseName') || '[]'));
  }
  
  ngOnInit(): void {
  }
  
  removeFromeFavorites(courseName: any): void {
    
    let favoritesCoursesNames = JSON.parse(localStorage.getItem('courseName') || '[]');
    let index = favoritesCoursesNames.indexOf(courseName);
    favoritesCoursesNames.splice(index, 1);
    localStorage.setItem('courseName', JSON.stringify(favoritesCoursesNames));
    this.routing = "/favorite";
    this.ifRouting = false;
  }
  
  router(index: number): void {
    if (this.ifRouting === true) { 
      sessionStorage.setItem("selectedItem", this.items[index].courseName);
      this.routing = "/course/" + this.items[index].courseNumber; 
    }
    this.ifRouting = true;
    window.location.href = this.routing;
  }
}



// this.favorites = JSON.parse(localStorage.getItem('courseNumber') || '[]');
// this.findFavoriteCourses();
// favorites: string[] = [];


// findFavoriteCourses() {
  
  //   for (let i = 0; i < this.favorites.length; i++) {
    
    //     const key = this.favorites[i];
    //     let keyDictionary: IDictionaryItem[] = this.dictionaryData[key[0]];
    
    //     for (let y = 0; y < keyDictionary.length; y++) {
      //       if (this.favorites[i] === keyDictionary[y].CourseNumber) { this.items.push(keyDictionary[y]); }
      //     }
      //   }
      // }
      //------------------------------------------------------------------------------------