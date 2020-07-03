import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { ListComponent } from './list.component';
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
