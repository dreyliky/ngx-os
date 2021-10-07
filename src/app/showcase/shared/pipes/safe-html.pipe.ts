import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'safeHTML'
})
export class SafeHtmlPipe implements PipeTransform {
    constructor(
        private readonly sanitizer: DomSanitizer
    ) {}

    public transform(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
