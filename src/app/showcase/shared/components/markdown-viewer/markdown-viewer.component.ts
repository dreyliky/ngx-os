import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CodeHighlighterService, CodeLanguageType } from '@features/code-highlighter';
import marked from 'marked';
import { FireAfterViewInit, TextComponent } from 'ngx-os';

interface CodeBlockInfo {
    selector: string;
    language: CodeLanguageType;
}

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
            this.highlightCodeBlocks();
        }
    }

    @ViewChild(TextComponent, { read: ElementRef })
    private readonly textRef: ElementRef<HTMLElement>;

    public parsedData: string = '';

    private readonly codeBlocks: CodeBlockInfo[] = [
        {
            selector: '.language-html',
            language: 'html'
        },
        {
            selector: '.language-scss',
            language: 'scss'
        },
        {
            selector: '.language-javascript',
            language: 'js'
        },
        {
            selector: '.language-typescript',
            language: 'ts'
        }
    ];

    constructor(
        private readonly highlighter: CodeHighlighterService
    ) {}

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

    @FireAfterViewInit()
    private highlightCodeBlocks(): void {
        this.codeBlocks.forEach(({ selector, language }) => {
            const blockElements = this.textRef.nativeElement
                .querySelectorAll<HTMLElement>(selector);

            this.highlightBlockElements(blockElements, language);
        });
    }

    private highlightBlockElements(blockElements: NodeListOf<HTMLElement>, language: CodeLanguageType): void {
        blockElements.forEach((blockElement) => {
            const rawCode = blockElement.innerText;
            const highlightedCode = this.highlighter.highlight(language, rawCode);
            blockElement.innerHTML = highlightedCode;

            blockElement.parentElement.classList.add('code-wrapper', 'os-scroll-view');
            blockElement.classList.add('code-block');
        });
    }
}
