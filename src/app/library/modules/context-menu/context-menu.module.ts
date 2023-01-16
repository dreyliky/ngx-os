import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { ContextMenuItemComponent } from './components';
import { ContextMenuDirective } from './directives';

@NgModule({
    declarations: [
        ContextMenuDirective,
        ContextMenuItemComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        ContextMenuDirective,
        ContextMenuItemComponent
    ]
})
export class ContextMenuModule {}
