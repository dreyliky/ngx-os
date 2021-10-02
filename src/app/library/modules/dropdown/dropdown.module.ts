import { NgModule } from '@angular/core';
import { ListModule } from '../list';
import { SharedModule } from '../shared.module';
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
