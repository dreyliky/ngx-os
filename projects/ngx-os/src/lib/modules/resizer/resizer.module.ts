import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { OsResizableDirective } from './directives';

@NgModule({
    declarations: [
        OsResizableDirective
    ],
    imports: [
        SharedModule
    ],
    exports: [
        OsResizableDirective
    ]
})
export class ResizerModule {}
