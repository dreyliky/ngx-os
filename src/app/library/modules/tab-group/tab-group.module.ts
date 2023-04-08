import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { TabComponent, TabGroupComponent } from './components';
import { TabContentDirective, TabLabelDirective } from './directives';

@NgModule({
    declarations: [
        TabGroupComponent,
        TabComponent,
        TabContentDirective,
        TabLabelDirective
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        TabGroupComponent,
        TabComponent,
        TabContentDirective,
        TabLabelDirective
    ]
})
export class TabGroupModule {}
