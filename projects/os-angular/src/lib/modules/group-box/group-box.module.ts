import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { GroupBoxComponent } from './group-box.component';

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
