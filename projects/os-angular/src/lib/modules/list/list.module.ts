import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { ListComponent, ItemComponent } from './components';

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
