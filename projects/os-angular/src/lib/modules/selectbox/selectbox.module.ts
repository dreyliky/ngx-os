import { NgModule } from '@angular/core';
import { SelectboxComponent } from './selectbox.component';
import { SharedModule } from '../../shared.module';
import { OptionComponent } from './components/option/option.component';

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
