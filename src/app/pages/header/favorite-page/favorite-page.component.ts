import { isPromise } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { IDictionaryItem } from 'src/app/features/bislat-container/bislat-container.component';
import { IDictionary } from 'src/app/features/bislat-container/bislat-container.component';
import * as data from '../../../mock-data.json';
import { SortCoursesService } from 'src/app/features/bislat-container/sort-courses.service';


@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit {

  dictionaryData: IDictionary = data;
  items: IDictionaryItem[] = [];
  routing: string = "/course/";
  ifRouting: boolean = true;
  
  constructor(service: SortCoursesService) {
    this.items = service.findFavoriteCourses();
  }
  
  ngOnInit(): void {
  }
  
  removeFromeFavorites(index: number): void {
    
    let favorites = JSON.parse(localStorage.getItem('courseNumber') || '[]');
    favorites.splice(index, 1);
    localStorage.setItem('courseNumber', JSON.stringify(favorites));
    this.routing = "/favorite";
    this.ifRouting = false;
  }
  
  router(index: number): void {
    if (this.ifRouting === true) { this.routing = "/course/" + this.items[index].CourseNumber; }
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