import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { MARKDOWN_CODE_BLOCKS } from '../../data';
import { CodeHighlighterService } from '../../services';
import { CodeLanguageType } from '../../types';

@Directive({
    selector: '[codeBlocksHighlighter]'
})
export class CodeBlocksHighlighterDirective implements OnDestroy {
    private _mutationObserver: MutationObserver;

    constructor(
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly highlighter: CodeHighlighterService
    ) {
        this.initMutationObserver();
        this._mutationObserver.observe(this.elementRef.nativeElement, { childList: true });
    }

    public ngOnDestroy(): void {
        this._mutationObserver?.disconnect();
    }

    private initMutationObserver(): void {
        this._mutationObserver = new MutationObserver(() => {
            this.highlightCodeBlocks();
        });
    }

    private highlightCodeBlocks(): void {
        MARKDOWN_CODE_BLOCKS.forEach(({ selector, language }) => {
            const blockElements = this.elementRef.nativeElement
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

            blockElement.parentElement?.classList.add('code-wrapper', 'os-scroll-view');
            blockElement.classList.add('code-block');
        });
    }
}
