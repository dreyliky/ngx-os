import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { ScrollViewModule } from '../scroll-view';
import { OptionComponent, OptionsComponent, SelectboxComponent } from './components';

@NgModule({
    declarations: [
        SelectboxComponent,
        OptionComponent,
        OptionsComponent
    ],
    imports: [
        SharedModule,
        ScrollViewModule
    ],
    exports: [
        SelectboxComponent,
        OptionComponent,
        OptionsComponent
    ]
})
export class SelectboxModule {}
