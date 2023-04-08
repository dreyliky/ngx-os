import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CodeBlocksHighlighterDirective } from './code-blocks-highlighter.directive';
import { MarkdownPreviewerComponent } from './markdown-previewer.component';
import { MarkdownToHtmlPipe } from './markdown-to-html.pipe';

@NgModule({
    declarations: [
        MarkdownPreviewerComponent,
        MarkdownToHtmlPipe,
        CodeBlocksHighlighterDirective
    ],
    imports: [
        SharedModule
    ],
    exports: [
        MarkdownPreviewerComponent
    ]
})
export class MarkdownPreviewerModule {}
