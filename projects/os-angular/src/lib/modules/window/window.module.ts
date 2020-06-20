import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ButtonModule } from '../button';
import { ScrollViewModule } from '../scroll-view';
import { WindowService } from './services';
import { DynamicWindowContentDirective } from './directives';
import { WindowComponent } from './window.component';
import { TitleBarComponent, DynamicWindowComponent } from './components';

@NgModule({
    declarations: [
        DynamicWindowContentDirective,

        WindowComponent,
        TitleBarComponent,
        DynamicWindowComponent
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
    ],
    entryComponents: [
        DynamicWindowComponent
    ]
})
export class WindowModule {}
