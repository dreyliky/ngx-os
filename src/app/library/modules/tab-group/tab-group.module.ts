import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { TabComponent, TabGroupComponent } from './components';

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
