import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { TabComponent, TabGroupComponent } from './components';

@NgModule({
    declarations: [
        TabGroupComponent,
        TabComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        TabGroupComponent,
        TabComponent
    ]
})
export class TabGroupModule {}
