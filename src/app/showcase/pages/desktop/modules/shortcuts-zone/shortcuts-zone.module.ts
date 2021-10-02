import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ShortcutsZoneComponent } from './shortcuts-zone.component';

@NgModule({
    declarations: [
        ShortcutsZoneComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ShortcutsZoneComponent
    ]
})
export class ShortcutsZoneModule {}
