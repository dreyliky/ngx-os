import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
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
