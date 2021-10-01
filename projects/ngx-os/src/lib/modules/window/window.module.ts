import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { ButtonModule } from '../button';
import { DragAndDropModule } from '../drag-and-drop';
import { ResizerModule } from '../resizer';
import { ScrollViewModule } from '../scroll-view';
import {
    DynamicWindowComponent,
    TitleBarButtonComponent,
    TitleBarComponent,
    TitleBarContentComponent,
    TitleBarControlsComponent,
    TitleBarIconComponent,
    WindowComponent
} from './components';
import { DYNAMIC_WINDOW_SHARED_CONFIG } from './data';
import { DynamicWindowSharedConfigService } from './services';

@NgModule({
    declarations: [
        DynamicWindowComponent,
        TitleBarButtonComponent,
        TitleBarComponent,
        TitleBarContentComponent,
        TitleBarControlsComponent,
        TitleBarIconComponent,
        WindowComponent
    ],
    imports: [
        SharedModule,
        ButtonModule,
        ScrollViewModule,
        ResizerModule,
        DragAndDropModule
    ],
    exports: [
        TitleBarButtonComponent,
        TitleBarComponent,
        TitleBarContentComponent,
        TitleBarControlsComponent,
        TitleBarIconComponent,
        WindowComponent
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
