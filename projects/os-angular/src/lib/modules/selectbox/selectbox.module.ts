import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { ListModule } from '../list';
import { ScrollViewModule } from '../scroll-view';
import { OptionComponent, SelectboxComponent } from './components';

@NgModule({
    declarations: [
        SelectboxComponent,
        OptionComponent
    ],
    imports: [
        SharedModule,
        ScrollViewModule,
        ListModule
    ],
    exports: [
        SelectboxComponent,
        OptionComponent
    ]
})
export class SelectboxModule {}
