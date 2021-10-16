import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import marked from 'marked';
import { OsBaseViewComponent, TextComponent } from 'ngx-os';
import { takeWhile } from 'rxjs/operators';
import { MARKDOWN_CODE_BLOCKS } from '../../data';
import { CodeHighlighterService } from '../../services';
import { CodeLanguageType } from '../../types';

@Component({
    selector: 'showcase-markdown-previewer',
    templateUrl: './markdown-previewer.component.html',
    styleUrls: ['./markdown-previewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownPreviewerComponent extends OsBaseViewComponent {
    @Input()
    public set data(data: string) {
        this.onNewData(data);
    }

    @ViewChild(TextComponent, { read: ElementRef })
    private readonly contentRef: ElementRef<HTMLElement>;

    constructor(
        private readonly highlighter: CodeHighlighterService
    ) {
        super();
    }

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

    private onNewData(data: string): void {
        this.whenViewInit$
            .pipe(takeWhile(() => !!data))
            .subscribe(() => {
                this.contentRef.nativeElement.innerHTML = marked(data);

                this.highlightCodeBlocks();
            });
    }

    private highlightCodeBlocks(): void {
        MARKDOWN_CODE_BLOCKS.forEach(({ selector, language }) => {
            const blockElements = this.contentRef.nativeElement
                .querySelectorAll<HTMLElement>(selector);

            this.highlightBlockElements(blockElements, language);
        });
    }

    private highlightBlockElements(
        blockElements: NodeListOf<HTMLElement>,
        language: CodeLanguageType
    ): void {
        blockElements.forEach((blockElement) => {
            const rawCode = blockElement.innerText;
            const highlightedCode = this.highlighter.highlight(language, rawCode);
            blockElement.innerHTML = highlightedCode;

            blockElement.parentElement.classList.add('code-wrapper', 'os-scroll-view');
            blockElement.classList.add('code-block');
        });
    }
}
