import { Component, OnInit } from '@angular/core';
import { ApiHelpersService } from 'src/app/services/api-helpers/api-helpers.service';

@Component({
  selector: 'app-sort-cycle',
  templateUrl: './sort-cycle.component.html',
  styleUrls: ['./sort-cycle.component.scss']
})
export class SortCycleComponent implements OnInit {

  sortingCycle: {
    name: string,
    genders: Array<{
      title: string,
      courses: Array<{ number: string, name: string }>
    }>
  };

  constructor(private apiFunc: ApiHelpersService) {
    this.sortingCycle = this.updateSortingCycle();
    console.log(this.sortingCycle);
  }

  ngOnInit(): void {
  }

  itemClicked(item: any) {
    console.log(item);
    sessionStorage.setItem("selectedItem", item.name);
    window.location.href = '/course/' + item.number;
  }

  updateSortingCycle() {
    let courses: any[][] = this.apiFunc.listOfGender("" + sessionStorage.getItem('selectedCycle'));

    let cycle: { name: string, genders: any[] } = {
      name: "" + sessionStorage.getItem('selectedCycle'),
      genders: []
    };

    if (courses[0].length) {
      cycle.genders.push({ title: 'אלקטרוניקה', courses: courses[0] });
    }
    if (courses[1].length) {
      cycle.genders.push({ title: 'אחזקה מתכת/חשמל', courses: courses[1] });
    }
    return cycle;
  }

}
