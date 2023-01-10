import { Injectable } from '@angular/core';
import { ApiCallsService } from '../api-connection/api-calls.service';

@Injectable({
  providedIn: 'root'
})
export class ApiHelpersService {

  constructor(private apiConnection: ApiCallsService) { }


  getCyclesListOfCourseName(cycle: string) {
    const allCourses = this.apiConnection.GetRequest('https://index-bislat-back.azurewebsites.net/Sort/' + cycle).courses;
    let listCourseName: string[] = [];

    for (let i = 0; i < allCourses.length; i++) {
      listCourseName.push(allCourses[i].courseName);
    }
    return listCourseName;
  }

  getListOfCycleName() {
    const allCycles = this.apiConnection.GetRequest('https://index-bislat-back.azurewebsites.net/Sort');
    let listCycleName: string[] = [];

    for (let i = 0; i < allCycles.length; i++) {
      listCycleName.push(allCycles[i].name);
    }
    // console.log(listCycleName);
    return listCycleName;
  }
}
