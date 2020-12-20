import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components.routing';
import { ListModule } from './list';
import { OverviewModule } from './overview';

@NgModule({
    imports: [
        ListModule,
        OverviewModule,
        ComponentsRoutingModule
    ]
})
export class ComponentsModule {}
