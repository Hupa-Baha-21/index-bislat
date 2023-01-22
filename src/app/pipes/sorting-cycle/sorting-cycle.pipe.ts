import { Pipe, PipeTransform } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-connection/api-calls.service';

@Pipe({
  name: 'sortingCycle'
})
export class SortingCyclePipe implements PipeTransform {

  constructor(private apiConnection: ApiCallsService) { }

  readonly http = "https://index-bislat-back.azurewebsites.net/Sort"

  transform(cycle: any): any {
    this.apiConnection.postRequest(this.http, cycle);
    return ({ name: cycle.name, isExpand: false, status: cycle.status });
  }
}
