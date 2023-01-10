import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ɵOsBaseViewComponent } from 'ngx-os';

@Component({
    selector: 'showcase-markdown-previewer',
    templateUrl: './markdown-previewer.component.html',
    styleUrls: ['./markdown-previewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownPreviewerComponent extends ɵOsBaseViewComponent {
    @Input()
    public data: string;

    public onClick(event: PointerEvent): void {
        this.processLinkClick(event);
        event.stopImmediatePropagation();
    }

    private processLinkClick(event: PointerEvent): void {
        const element = event.target as HTMLElement;

        if (element.tagName === 'A') {
            const href = element.getAttribute('href') as string;

            window.open(href, '_blank')?.focus();
            event.preventDefault();
        }
    }
}
