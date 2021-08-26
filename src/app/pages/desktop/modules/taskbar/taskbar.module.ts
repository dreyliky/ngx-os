import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
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
    ]
})
export class TaskbarModule {}
