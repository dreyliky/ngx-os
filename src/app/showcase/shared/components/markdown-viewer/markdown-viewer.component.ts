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
}
