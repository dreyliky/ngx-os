import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components.routing';
import { GridModule } from './list';
import { OverviewModule } from './overview';

@NgModule({
    imports: [
        GridModule,
        OverviewModule,
        ComponentsRoutingModule
    ]
})
export class ComponentsModule {}
