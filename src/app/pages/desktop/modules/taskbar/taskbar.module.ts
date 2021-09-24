import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
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
