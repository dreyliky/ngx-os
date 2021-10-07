import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import marked from 'marked';

@Component({
    selector: 'showcase-markdown-viewer',
    templateUrl: './markdown-viewer.component.html',
    styleUrls: ['./markdown-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownViewerComponent {
    @Input()
    public set data(data: string) {
        if (data) {
            this.parsedData = marked(data);
        }
    }

    public parsedData: string = '';

    public onClick(event: MouseEvent): void {
        this.processLinkClick(event);
        event.stopImmediatePropagation();
    }

    private processLinkClick(event: MouseEvent): void {
        const element = event.target as HTMLElement;

        if (element.tagName === 'A') {
            const href = element.getAttribute('href');

            window.open(href, '_blank').focus();
            event.preventDefault();
        }
    }
}
