import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CodeViewerComponent, MarkdownPreviewerComponent } from './components';

@NgModule({
    declarations: [
        CodeViewerComponent,
        MarkdownPreviewerComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        CodeViewerComponent,
        MarkdownPreviewerComponent
    ]
})
export class CodeHighlighterModule {}
