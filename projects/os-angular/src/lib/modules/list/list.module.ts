import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { SharedModule } from '../../shared.module';
import { ItemComponent } from './components/item/item.component';

@NgModule({
    declarations: [
        ListComponent,
        ItemComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ListComponent,
        ItemComponent
    ]
})
export class ListModule {}
