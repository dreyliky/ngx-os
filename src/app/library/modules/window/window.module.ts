import { NgModule } from '@angular/core';
import { ButtonModule } from '../button';
import { DragAndDropModule } from '../drag-and-drop';
import { ResizerModule } from '../resizer';
import { ScrollViewModule } from '../scroll-view';
import { ɵSharedModule } from '../shared.module';
import {
    TitleBarButtonComponent,
    TitleBarComponent,
    TitleBarContentComponent,
    TitleBarControlsComponent,
    TitleBarIconComponent,
    WindowComponent,
    ɵDynamicWindowComponent,
    ɵDynamicWindowCssClassesBindingDirective,
    ɵDynamicWindowCssVariablesBindingDirective,
    ɵDynamicWindowDraggableDirective,
    ɵDynamicWindowResizableDirective,
    ɵDynamicWindowSizeCssVariablesBindingDirective
} from './components';
import { ɵDYNAMIC_WINDOW_SHARED_CONFIG_PROVIDER } from './data';

@NgModule({
    declarations: [
        ɵDynamicWindowComponent,
        ɵDynamicWindowCssVariablesBindingDirective,
        ɵDynamicWindowCssClassesBindingDirective,
        ɵDynamicWindowResizableDirective,
        ɵDynamicWindowDraggableDirective,
        ɵDynamicWindowSizeCssVariablesBindingDirective,
        TitleBarButtonComponent,
        TitleBarComponent,
        TitleBarContentComponent,
        TitleBarControlsComponent,
        TitleBarIconComponent,
        WindowComponent
    ],
    imports: [
        ɵSharedModule,
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
