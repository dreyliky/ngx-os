import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { ListModule } from '../list';
import { OptionComponent, SelectboxComponent } from './components';

@NgModule({
    declarations: [
        SelectboxComponent,
        OptionComponent
    ],
    imports: [
        SharedModule,
        ListModule
    ],
    exports: [
        SelectboxComponent,
        OptionComponent
    ]
})
export class SelectboxModule {}
