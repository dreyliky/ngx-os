import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ShutDownAppComponent } from './shut-down.component';

@NgModule({
    declarations: [
        ShutDownAppComponent
    ],
    imports: [
        SharedModule
    ]
})
export class ShutDownAppModule {}
