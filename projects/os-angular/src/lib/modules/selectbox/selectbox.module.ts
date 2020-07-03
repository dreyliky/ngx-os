import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { SelectboxComponent, OptionComponent } from './components';

@NgModule({
    declarations: [
        SelectboxComponent,
        OptionComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        SelectboxComponent,
        OptionComponent
    ]
})
export class SelectboxModule {}
