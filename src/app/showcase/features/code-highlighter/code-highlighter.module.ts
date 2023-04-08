import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CodeViewerComponent, MarkdownPreviewerModule } from './components';

@NgModule({
    declarations: [
        CodeViewerComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        CodeViewerComponent,
        MarkdownPreviewerModule
    ]
})
export class CodeHighlighterModule {}
