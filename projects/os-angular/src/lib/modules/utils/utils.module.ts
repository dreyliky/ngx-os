import { NgModule } from '@angular/core';
import { AppendToBodyDirective } from './directives';

@NgModule({
    declarations: [
        AppendToBodyDirective
    ],
    exports: [
        AppendToBodyDirective
    ]
})
export class UtilsModule {}
