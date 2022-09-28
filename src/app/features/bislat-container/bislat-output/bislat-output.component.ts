import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, Renderer2, Input, OnInit, ViewChild } from '@angular/core';
import { IDictionaryItem } from '../bislat-container.component';
import { ActivatedRoute } from '@angular/router';
import { IDictionary } from '../bislat-container.component';
import * as data from '../../../mock-data.json'
import { SortCoursesService } from '../sort-courses.service';
import { bases } from 'src/app/pages/header/img-url';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';


@Component({
  selector: 'app-bislat-output',
  templateUrl: './bislat-output.component.html',
  styleUrls: ['./bislat-output.component.scss']
})
export class BislatOutputComponent implements OnInit {

  favoritePosition: string;
  isReadMore: boolean = false;
  changeMap: boolean = false;
  alertText: string = 'נוסף למועדפים בהצלחה'
  timer: number = 0;
  tof: boolean[] = [];

  inputPlaceholder: string = "" + this.route.snapshot.paramMap.get('number');
  dictionaryData: IDictionary = data;
  item: IDictionaryItem;

  @ViewChild(MatSidenav) snav!: MatSidenav;

  map: Document | undefined;
  @ViewChild("mapObject") set mapObject(o: ElementRef) {
    this.renderer.listen(o.nativeElement, "load", () => {
      this.map = o.nativeElement.contentDocument;
      this.removeBases();
    });
  };

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, service: SortCoursesService, private renderer: Renderer2) {

    this.item = service.getSelectedCourse(this.inputPlaceholder);
    this.favoritePosition = service.isItemFavorite(this.item);
    setTimeout(() => { this.changeMap = this.mapPosition(); }, 3500);
    this.timer = new Date().getTime();
  }

  ngOnInit(): void {
  }

  renameBases(): string[] {

    let elementsID: string[] = [];

    for (let i = 0; i < this.item.CourseBases.length; i++) {
      if (this.item.CourseBases[i] === "יחידות בקרה אווירית") {
        elementsID.push('יב_א_צפונית');
        elementsID.push('יב_א_מרכז');
        elementsID.push('יב_א_דרומית');
        break;
      }
      else if (this.item.CourseBases[i] === "בסיסי טיסה") {
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
      else if (this.item.CourseBases[i] === "יחידות הגנ''א") {
        elementsID.push('כנף_4');
        elementsID.push('ביסל_א');
        elementsID.push('בח_א_30');
        break;
      }
      else if (this.item.CourseBases[i] === "יחידת קשר 502") { elementsID.push('כנף_4'); break; }
      else {
        let tmp = this.item.CourseBases[i].replace(" ", "_").replace("''", "_");
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
        // console.log(bases[i]);
        this.renderer.setStyle(this.map?.getElementById(bases[i]), "display", "none");
      }
    }
  } //--------------------------------------------------

  removeOrAddFavorite(): void {

    let favorites: string[] = JSON.parse(localStorage.getItem('courseName') || '[]');

    if (this.favoritePosition === 'notFavorite.svg') {

      this.favoritePosition = 'favorite.svg';
      favorites.push(this.item.CourseName);
      this.alertText = "נוסף למועדפים בהצלחה";
    }

    else if (this.favoritePosition === 'favorite.svg') {

      this.favoritePosition = 'notFavorite.svg';
      this.alertText = "הוסר מהמועדפים";

      for (let i = 0; i < favorites.length; i++) {

        if (favorites[i] === this.item.CourseName) {
          favorites.splice(i, 1);
          break;
        }
      }
    }

    this.snav.opened = true;
    this.tof.push(true);
    let index = this.tof.length - 1;
    setTimeout(() => { this.tof[index] = false }, 1100);
    setTimeout(() => { if (!this.tof.includes(true)) { this.snav.opened = false; } }, 1100);
    localStorage.setItem('courseName', JSON.stringify(favorites));
  }
}
