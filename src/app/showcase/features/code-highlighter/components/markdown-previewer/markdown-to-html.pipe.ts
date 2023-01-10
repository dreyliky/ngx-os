import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
    name: 'markdownToHtml'
})
export class MarkdownToHtmlPipe implements PipeTransform {
    constructor(
        private readonly domSanitizer: DomSanitizer
    ) {}

    public transform(markdown: string): SafeHtml {
        const html = marked(markdown);

        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }
}
