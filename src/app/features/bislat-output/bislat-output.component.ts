import { Component, ElementRef, Renderer2, OnInit, ViewChild } from '@angular/core';
// import * as data from '../../mock-data.json'
import { searchCourses } from '../../services/api-helpers/search/search-courses.service';
import { bases } from 'src/app/pages/header/img-url';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-bislat-output',
  templateUrl: './bislat-output.component.html',
  styleUrls: ['./bislat-output.component.scss']
})
export class BislatOutputComponent implements OnInit {

  item: any;
  isItemFavorite: string;
  changeMap: boolean = false;
  alertText: string = 'נוסף למועדפים בהצלחה'
  tof: boolean[] = [];

  // inputPlaceholder: string = "" + this.route.snapshot.paramMap.get('number');
  // dictionaryData: IDictionary = data;

  @ViewChild(MatSidenav) snav!: MatSidenav;

  mapp: Document | undefined;
  @ViewChild("mapObject") set mapObject(o: ElementRef) {
    this.renderer.listen(o.nativeElement, "load", () => {
      this.mapp = o.nativeElement.contentDocument;
      this.removeBases();
    });
  };

  constructor(service: searchCourses, private renderer: Renderer2) {

    // this.item = service.getSelectedCourse(this.inputPlaceholder);
    this.item = service.getClearedSelectedCourses([JSON.stringify(sessionStorage.getItem('selectedItem'))])[0];
    this.isItemFavorite = service.isItemFavorite(this.item);
    setTimeout(() => { this.changeMap = this.mapPosition(); }, 3500);
    // private sanitizer: DomSanitizer, 
  }

  ngOnInit(): void {
  }

  renameBases(): string[] {

    let elementsID: string[] = [];

    for (let i = 0; i < this.item.courseBases.length; i++) {
      if (this.item.courseBases[i] === "יחידות בקרה אווירית") {
        elementsID.push('יב_א_צפונית');
        elementsID.push('יב_א_מרכז');
        elementsID.push('יב_א_דרומית');
        break;
      }
      else if (this.item.courseBases[i] === "בסיסי טיסה") {
        elementsID.push('כנף_1');
        elementsID.push('בח_א_30');
        elementsID.push('בח_א_8');
        elementsID.push('כנף_4');
        elementsID.push('בח_א_6');
        elementsID.push('בח_א_28');
        elementsID.push('כנף_25');
        elementsID.push('בח_א_10');
        break;
      }
      else if (this.item.courseBases[i] === "יחידות הגנ''א") {
        elementsID.push('כנף_4');
        elementsID.push('ביסל_א');
        elementsID.push('בח_א_30');
        break;
      }
      else if (this.item.courseBases[i] === "יחידת קשר 502") { elementsID.push('כנף_4'); break; }
      else {
        let tmp = this.item.courseBases[i].replace(" ", "_").replace("''", "_");
        if (!elementsID.includes(tmp)) { elementsID.push(tmp); }
      }
    }
    return elementsID;
  }  //--------------------------------------------------

  mapPosition(): boolean {
    const courseBases: string[] = this.renameBases();

    for (let i = 0; i < courseBases.length; i++) {
      if (!bases.includes(courseBases[i])) { return false; }
    }
    return true;
  }  //--------------------------------------------------

  removeBases() {
    const elementsID: string[] = this.renameBases();

    for (let i = 0; i < bases.length; i++) {
      if (!elementsID.includes(bases[i])) {
        this.renderer.setStyle(this.mapp?.getElementById(bases[i]), "display", "none");
      }
    }
  } //--------------------------------------------------

  removeOrAddFavorite(): void {

    let favoritesCoursesName: string[] = JSON.parse(localStorage.getItem('courseName') || '[]');

    switch (this.isItemFavorite) {
      case 'notFavorite.svg':
        this.isItemFavorite = 'favorite.svg';
        favoritesCoursesName.push(this.item.courseName);
        this.alertText = "נוסף למועדפים בהצלחה";
        break;

      case 'favorite.svg':
        this.isItemFavorite = 'notFavorite.svg';
        this.alertText = "הוסר מהמועדפים";
        let index = favoritesCoursesName.indexOf(this.item.courseName);
        favoritesCoursesName.splice(index, 1);
        break;
    }

    this.snav.opened = true;
    this.tof.push(true);
    let index = this.tof.length - 1;
    setTimeout(() => { this.tof[index] = false }, 1100);
    setTimeout(() => { if (!this.tof.includes(true)) { this.snav.opened = false; } }, 1100);
    localStorage.setItem('courseName', JSON.stringify(favoritesCoursesName));
  }
}
