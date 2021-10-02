import { NgModule } from '@angular/core';
import { ButtonModule } from '../button';
import { SharedModule } from '../shared.module';
import { TabComponent, TabGroupComponent } from './components';

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
