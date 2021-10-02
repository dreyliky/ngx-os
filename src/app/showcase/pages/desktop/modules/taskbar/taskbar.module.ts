import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { TaskbarPlacementService } from './services';
import { TaskbarComponent } from './taskbar.component';

@NgModule({
    declarations: [
        TaskbarComponent
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
