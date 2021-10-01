import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { ListModule } from '../list';
import { DropdownComponent, DropdownItemComponent } from './components';

@NgModule({
    declarations: [
        DropdownComponent,
        DropdownItemComponent
    ],
    imports: [
        SharedModule,
        ListModule
    ],
    exports: [
        DropdownComponent,
        DropdownItemComponent
    ]
})
export class DropdownModule {}
