import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components.routing';
import { PageStructureModule } from './page-structure';

@NgModule({
    imports: [
        PageStructureModule,
        ComponentsRoutingModule
    ]
})
export class ComponentsModule {}
