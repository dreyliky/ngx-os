import { NgModule } from '@angular/core';
import { WindowComponent } from './window.component';
import { SharedModule } from '../../shared.module';
import { ButtonModule } from '../button';
import { ScrollViewModule } from '../scroll-view';
import { TitleBarComponent } from './components';
import { WindowService } from './services';

@NgModule({
    declarations: [
        WindowComponent,
        TitleBarComponent
    ],
    imports: [
        SharedModule,

        ButtonModule,
        ScrollViewModule
    ],
    exports: [
        WindowComponent,
        TitleBarComponent
    ],
    providers: [
        WindowService
    ]
})
export class WindowModule {}
