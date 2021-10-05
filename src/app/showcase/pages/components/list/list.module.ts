import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ListComponent } from './list.component';

@NgModule({
    declarations: [
        ListComponent
    ],
    imports: [
        SharedModule
    ]
})
export class ListModule {}
