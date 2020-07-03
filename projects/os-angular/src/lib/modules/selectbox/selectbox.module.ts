import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { SelectboxComponent } from './selectbox.component';
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
