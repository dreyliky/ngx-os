import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { ButtonModule } from 'os-angular/modules/button';
import { ScrollViewModule } from 'os-angular/modules/scroll-view';
import { ResizerModule } from 'os-angular/modules/resizer';
import { DragAndDropModule } from 'os-angular/modules/drag-and-drop';
import { DynamicWindowService, DynamicWindowControlService } from './services';
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
        ScrollViewModule,
        ResizerModule,
        DragAndDropModule
    ],
    exports: [
        WindowComponent,
        TitleBarComponent
    ],
    providers: [
        DynamicWindowControlService,
        DynamicWindowService
    ],
    entryComponents: [
        DynamicWindowComponent
    ]
})
export class WindowModule {}
