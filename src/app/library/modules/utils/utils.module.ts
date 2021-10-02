import { NgModule } from '@angular/core';
import { AppendToBodyDirective, FixedToParentDirective } from './directives';

@NgModule({
    declarations: [
        AppendToBodyDirective,
        FixedToParentDirective
    ],
    exports: [
        AppendToBodyDirective,
        FixedToParentDirective
    ]
})
export class UtilsModule {}
