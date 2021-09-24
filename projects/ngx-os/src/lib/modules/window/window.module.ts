import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { ButtonModule } from '../button';
import { DragAndDropModule } from '../drag-and-drop';
import { ResizerModule } from '../resizer';
import { ScrollViewModule } from '../scroll-view';
import { DynamicWindowComponent, TitleBarButtonComponent, TitleBarComponent, WindowComponent } from './components';
import { DYNAMIC_WINDOW_SHARED_CONFIG } from './data';
import { DynamicWindowContentDirective } from './directives';
import { DynamicWindowSharedConfigService } from './services';

@NgModule({
    declarations: [
        DynamicWindowContentDirective,
        WindowComponent,
        TitleBarComponent,
        TitleBarButtonComponent,
        DynamicWindowComponent
    ],
    imports: [
        SharedModule,
        ButtonModule,
        ScrollViewModule,
        ResizerModule,
        DragAndDropModule
    ],
    exports: [
        WindowComponent,
        TitleBarComponent,
        TitleBarButtonComponent
    ],
    providers: [
        {
            provide: DYNAMIC_WINDOW_SHARED_CONFIG,
            useFactory: (service: DynamicWindowSharedConfigService) => service.data$,
            deps: [DynamicWindowSharedConfigService]
        }
    ]
})
export class WindowModule {}
