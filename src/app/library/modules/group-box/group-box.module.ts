import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { GroupBoxComponent } from './components';

@NgModule({
    declarations: [
        GroupBoxComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        GroupBoxComponent
    ]
})
export class GroupBoxModule {}
