import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { SharedModule } from '@Doc/demo-shared.module';

@NgModule({
    declarations: [
        ListComponent
    ],
    imports: [
        SharedModule
    ]
})
export class ListModule {}
