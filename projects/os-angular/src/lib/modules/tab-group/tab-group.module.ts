import { NgModule } from '@angular/core';
import { SharedModule } from '@lib';
import { ButtonModule } from '../button';
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
