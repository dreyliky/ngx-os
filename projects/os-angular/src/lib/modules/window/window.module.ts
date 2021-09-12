import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { ButtonModule } from '../button';
import { DragAndDropModule } from '../drag-and-drop';
import { ResizerModule } from '../resizer';
import { ScrollViewModule } from '../scroll-view';
import { DynamicWindowComponent, TitleBarComponent, WindowComponent } from './components';
import { DynamicWindowContentDirective } from './directives';

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
        ScrollViewModule,
        ResizerModule,
        DragAndDropModule
    ],
    exports: [
        WindowComponent,
        TitleBarComponent
    ]
})
export class WindowModule {}
