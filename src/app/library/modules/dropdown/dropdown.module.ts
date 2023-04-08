import { NgModule } from '@angular/core';
import { ListModule } from '../list';
import { ɵSharedModule } from '../shared.module';
import { DropdownComponent, DropdownItemComponent } from './components';

@NgModule({
    declarations: [
        DropdownComponent,
        DropdownItemComponent
    ],
    imports: [
        ɵSharedModule,
        ListModule
    ],
    exports: [
        DropdownComponent,
        DropdownItemComponent
    ]
})
export class DropdownModule {}
