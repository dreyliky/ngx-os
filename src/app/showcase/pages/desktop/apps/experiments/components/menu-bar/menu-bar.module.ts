import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MenuBarComponent } from './menu-bar.component';
import { SpawnBarComponent } from './spawn-bar/spawn-bar.component';
import { GroupActionsBarComponent } from './group-actions-bar/group-actions-bar.component';

@NgModule({
    declarations: [
        MenuBarComponent,
        SpawnBarComponent,
        GroupActionsBarComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        MenuBarComponent
    ]
})
export class MenuBarModule {}
