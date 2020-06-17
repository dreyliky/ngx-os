import { NgModule } from '@angular/core';
import { GroupBoxComponent } from './group-box.component';
import { SharedModule } from '../../shared.module';

@NgModule({
    declarations: [
        GroupBoxComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        GroupBoxComponent
    ]
})
export class GroupBoxModule {}
