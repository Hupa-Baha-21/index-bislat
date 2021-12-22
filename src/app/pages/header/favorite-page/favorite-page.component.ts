import { Component, OnInit } from '@angular/core';
import { IDictionaryItem } from 'src/app/features/bislat-container/bislat-container.component';
import { IDictionary } from 'src/app/features/bislat-container/bislat-container.component';
import * as data from '../../../mock-data.json'

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit {

  favorites: string[] = [];
  dictionaryData: IDictionary = data;
  items: IDictionaryItem[] = [];

  constructor() {
    this.favorites = JSON.parse(localStorage.getItem('courseNumber') || '[]');
    this.findItemes();
  }

  ngOnInit(): void {
  }

  findItemes() {

    for (let i = 0; i < this.favorites.length; i++) {

      const key = this.favorites[0];
      let keyDictionary: IDictionaryItem[] = this.dictionaryData[key[0]];

      for (let y = 0; y < keyDictionary.length; y++) {
        if (this.favorites[i] === keyDictionary[y].CourseNumber) { this.items.push(keyDictionary[y]); }
      }
    }
  }
  //------------------------------------------------------------------------------------


}
