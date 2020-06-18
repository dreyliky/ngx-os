import { NgModule } from '@angular/core';
import { WindowComponent } from './window.component';
import { SharedModule } from '../../shared.module';
import { ButtonModule } from '../button';
import { TitleBarComponent } from './components';

@NgModule({
    declarations: [
        WindowComponent,
        TitleBarComponent
    ],
    imports: [
        SharedModule,

        ButtonModule
    ],
    exports: [
        WindowComponent,
        TitleBarComponent
    ]
})
export class WindowModule {}
