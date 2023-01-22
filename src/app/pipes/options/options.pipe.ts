import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ApiHelpersService } from 'src/app/services/api-helpers/api-helpers.service';



@Pipe({
  name: 'options'
})
export class OptionsPipe implements PipeTransform {

  transform(element: string, Courses: string[], cycles: string[]): string[] {

    switch (element) {
      case "cycleInput": return [" ", ...cycles];
      case "genderInput": return [" ", "אלקטרוניקה", "אחזקה מתכת/ חשמל"];
    }

    return [" ", ...Courses];
  }

}
