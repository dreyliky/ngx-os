import { NgModule } from '@angular/core';
import { TabGroupComponent } from './tab-group.component';
import { SharedModule } from '../../shared.module';
import { TabComponent } from './components/tab/tab.component';

@NgModule({
    declarations: [
        TabGroupComponent,
        TabComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TabGroupComponent,
        TabComponent
    ]
})
export class TabGroupModule {}
