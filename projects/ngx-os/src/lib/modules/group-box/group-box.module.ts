import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { GroupBoxComponent } from './components';

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
