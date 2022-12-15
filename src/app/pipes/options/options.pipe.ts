import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of } from 'rxjs';



@Pipe({
  name: 'options'
})
export class OptionsPipe implements PipeTransform {

  transform(element: string, Courses: string[]): string[] {

    switch (element) {
      case "cycleInput": return [" ", "מחזור גיוס"];
      case "genderInput": return [" ", "אלקטרוניקה", "אחזקה מתכת/ חשמל"];
    }

    return [" ", ...Courses];
  }

}
