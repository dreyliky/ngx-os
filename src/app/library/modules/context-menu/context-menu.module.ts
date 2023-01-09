import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { ContextMenuItemComponent } from './components';
import {
    ContextMenuActionDirective,
    ContextMenuDirective
} from './directives';

@NgModule({
    declarations: [
        ContextMenuDirective,
        ContextMenuActionDirective,
        ContextMenuItemComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        ContextMenuDirective,
        ContextMenuActionDirective,
        ContextMenuItemComponent
    ]
})
export class ContextMenuModule {}
