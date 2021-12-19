import { NgModule } from '@angular/core';
import { ButtonModule } from '../button';
import { DragAndDropModule } from '../drag-and-drop';
import { ResizerModule } from '../resizer';
import { ScrollViewModule } from '../scroll-view';
import { SharedModule } from '../shared.module';
import {
    DynamicWindowComponent,
    TitleBarButtonComponent,
    TitleBarComponent,
    TitleBarContentComponent,
    TitleBarControlsComponent,
    TitleBarIconComponent,
    WindowComponent
} from './components';
import { ɵDYNAMIC_WINDOW_SHARED_CONFIG_PROVIDER } from './data';

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
        ɵDYNAMIC_WINDOW_SHARED_CONFIG_PROVIDER
    ]
})
export class WindowModule {}
