import { Component, OnInit } from '@angular/core';
import { listAvionics } from '../img-url';

@Component({
  selector: 'app-sort-cycle',
  templateUrl: './sort-cycle.component.html',
  styleUrls: ['./sort-cycle.component.scss']
})
export class SortCycleComponent implements OnInit {


  listAvionics = listAvionics;

  listMaintenace: string[][] = [
    ["טכנאי דרג א' כלי טייס מאוייש זיק", "0828"],
    ["טכנאי דרג א' מטוסים תובלה קלה", "0065"],
    ["טכנאי דרג א' מטוס תובלה כבדה קרנף", "0827"],
    ["טכנאי דרג א' ברק/ סופה", "1373"],
    ["טכנאי דרג א' מסוק פתן", "1175"],
    ["טכנאי מסוק יסעור", "1287"],
    ["טכנאי מבנה מטוס", "1753"],
    ["טכנאי חשמל מטוסים אחוד (חמ''מ)", "1266"],
    ["טכנאי דרג ב' מטוסים ברק/ סופה", "1421"],
    ["טכנאי מטוס רעם", "1293"],
    ["טכנאי דרג א' מטוס אדיר", "1402"],
    ["טכנאי דרג א' כלי טייס מאוייש כוכב", "0828"],
    ["טכנאי אביזרים הגנה אווירית", "1795"],
    ["טכנאי מסגר מכני", "0351"],
    ["טכנאי מערכות קרקע ממוכנות", "1707"],
    ["טכנאי תחמושת אווירית", "0325"],
    ["טכנאי מערכות חימוש", "1298"]
  ];

  constructor() { }

  ngOnInit(): void {
  }

  itemClicked(courseName: string) {
    sessionStorage.setItem("selectedItem", courseName);
  }

}
