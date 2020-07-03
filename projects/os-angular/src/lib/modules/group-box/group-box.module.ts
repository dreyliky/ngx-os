import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
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
