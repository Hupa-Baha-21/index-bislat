import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Pipe({
  name: 'safePipe'
})
export class SafePipePipe implements PipeTransform {

  readonly urlPrefix = "https://www.youtube.com/embed/"

  constructor(private sanitizer: DomSanitizer) { }

  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlPrefix + url);
  }

}
