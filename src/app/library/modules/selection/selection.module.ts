import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { SelectionItemDirective, SelectionZoneDirective } from './directives';

@NgModule({
    declarations: [
        SelectionZoneDirective,
        SelectionItemDirective
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        SelectionZoneDirective,
        SelectionItemDirective
    ]
})
export class SelectionModule {}
