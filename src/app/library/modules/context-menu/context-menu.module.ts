import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { ContextMenuDirective } from './directives';

@NgModule({
    declarations: [
        ContextMenuDirective
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        ContextMenuDirective
    ]
})
export class ContextMenuModule {}
