import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { ButtonModule } from 'os-angular/modules/button';
import { TabGroupComponent } from './tab-group.component';
import { TabComponent } from './components/tab/tab.component';

@NgModule({
    declarations: [
        TabGroupComponent,
        TabComponent
    ],
    imports: [
        SharedModule,

        ButtonModule
    ],
    exports: [
        TabGroupComponent,
        TabComponent
    ]
})
export class TabGroupModule {}
