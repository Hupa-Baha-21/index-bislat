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
    // this.changeMap = this.mapPosition();
    setTimeout(() => { this.changeMap = this.mapPosition(); }, 3500);
  }

  ngOnInit(): void {
  }

  alertMessage(position: string): void {
    if (position === 'delete') { this.alertText = 'הוסר מהמועדפים'; }
    else { this.alertText = 'נוסף למועדפים בהצלחה'; }

    // this.snav.opened = false;
    // this.snav.opened = true;
    // setTimeout(() => { this.snav.opened = false }, 1200);
  }

  renameBases(): string[] {

    let elementsID: string[] = [];

    for (let i = 0; i < this.item.CourseBases.length; i++) {
      elementsID.push(this.item.CourseBases[i].replace(" ", "_").replace("''", "_"));
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
    // if (!this.changeMap) { return; }
    const elementsID: string[] = this.renameBases();

    for (let i = 0; i < bases.length; i++) {
      if (!elementsID.includes(bases[i])) {
        this.renderer.setStyle(this.map?.getElementById(bases[i]), "display", "none");
      }
    }
  } //--------------------------------------------------

  removeOrAddFavorite(): void {

    let favorites: string[] = JSON.parse(localStorage.getItem('courseName') || '[]');

    if (this.favoritePosition === 'notFavorite.svg') {

      this.favoritePosition = 'favorite.svg';
      favorites.push(this.item.CourseName);
      this.alertMessage("add");
    }

    else if (this.favoritePosition === 'favorite.svg') {

      this.favoritePosition = 'notFavorite.svg';
      // let alert: string = 'הוסר מהמועדפים';
      this.alertMessage("delete");
      for (let i = 0; i < favorites.length; i++) {

        if (favorites[i] === this.item.CourseName) {
          favorites.splice(i, 1);
          break;
        }
      }
    }

    this.snav.opened = true;
    setTimeout(() => { this.snav.opened = false }, 1200);
    localStorage.setItem('courseName', JSON.stringify(favorites));
  }
}
