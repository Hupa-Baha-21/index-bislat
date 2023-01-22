import { Injectable } from '@angular/core';
import { StandardInteractionClient } from '@azure/msal-browser/dist/internals';
import { ApiCallsService } from '../api-connection/api-calls.service';

@Injectable({
  providedIn: 'root'
})
export class ApiHelpersService {
  allCycles: any[];

  constructor(private apiConnection: ApiCallsService) {
    this.allCycles = this.apiConnection.GetRequest('https://index-bislat-back.azurewebsites.net/Sort');
  }


  getCyclesListOfCourseName(cycle: string) {
    const allCourses = this.apiConnection.GetRequest('https://index-bislat-back.azurewebsites.net/Sort/' + cycle).courses;
    let listCourseName: string[] = [];

    for (let i = 0; i < allCourses.length; i++) {
      listCourseName.push(allCourses[i].courseName);
    }
    return listCourseName;
  }

  getListOfCycleName() {
    // const allCycles = this.apiConnection.GetRequest('https://index-bislat-back.azurewebsites.net/Sort');
    let listCycleName: string[] = [];

    for (let i = 0; i < this.allCycles.length; i++) {
      listCycleName.push(this.allCycles[i].name);
    }
    // console.log(listCycleName);
    return listCycleName;
  }

  ListOfShowOnWebCycles() {
    let showOnWebCycles = [];

    showOnWebCycles = this.allCycles.filter(item => item.status === 1 || item.status === 2);
    return showOnWebCycles;
  }

  listOfNmAndName(cycle: string) {
    const courses = this.apiConnection.GetRequest('https://index-bislat-back.azurewebsites.net/Sort/' + cycle).courses;
    let listCourseName: Array<{ name: string, num: string }> = [];

    for (let i = 0; i < courses.length; i++) {
      listCourseName.push({ name: courses[i].courseName, num: courses.courseNumber });
    }
    return listCourseName;
  }

  listOfGender(cycleName: string) {
    const courses: any[] = this.apiConnection.GetRequest('https://index-bislat-back.azurewebsites.net/Sort/' + cycleName).courses;

    let gendersList: any[][] = [[], []];

    for (let i = 0; i < courses.length; i++) {
      switch (courses[i].gender) {
        case 'Avionics':
          gendersList[0].push({ number: courses[i].courseNumber, name: courses[i].courseName });
          break;
        case 'Maintenace':
          gendersList[1].push({ number: courses[i].courseNumber, name: courses[i].courseName });
          break;
      }
    }
    return gendersList;
  }
}
