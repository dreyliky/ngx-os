import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { ButtonModule } from '../button';
import { DragAndDropModule } from '../drag-and-drop';
import { ResizerModule } from '../resizer';
import { ScrollViewModule } from '../scroll-view';
import { DynamicWindowComponent, TitleBarButtonComponent, TitleBarComponent, WindowComponent } from './components';
import { DynamicWindowContentDirective } from './directives';

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
    ]
})
export class WindowModule {}
