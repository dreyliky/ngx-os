import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { EditBarComponent } from './edit-bar';
import { FileBarComponent } from './file-bar';
import { FormatBarComponent } from './format-bar';
import { HelpBarComponent } from './help-bar';
import { MenuBarComponent } from './menu-bar.component';
import { ViewBarComponent } from './view-bar';

@NgModule({
    declarations: [
        MenuBarComponent,
        FileBarComponent,
        FormatBarComponent,
        HelpBarComponent,
        ViewBarComponent,
        EditBarComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        MenuBarComponent
    ]
})
export class MenuBarModule {}
