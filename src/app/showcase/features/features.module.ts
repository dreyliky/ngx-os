import { NgModule } from '@angular/core';
import { CodeHighlighterModule } from './code-highlighter';
import { ThemeModule } from './theme';

@NgModule({
    exports: [
        CodeHighlighterModule,
        ThemeModule
    ]
})
export class FeaturesModule {}
