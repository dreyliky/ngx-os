import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
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
