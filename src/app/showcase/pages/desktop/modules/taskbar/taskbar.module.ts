import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { TaskbarPlacementService } from './services';
import { TaskbarComponent } from './taskbar.component';
import { TaskbarButtonComponent } from './components/taskbar-button/taskbar-button.component';

@NgModule({
    declarations: [
        TaskbarComponent,
        TaskbarButtonComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TaskbarComponent
    ],
    providers: [
        TaskbarPlacementService
    ]
})
export class TaskbarModule {}
