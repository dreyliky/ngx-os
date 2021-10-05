import { NgModule } from '@angular/core';
import { DocumentationModule } from '@features/documentation';
import { SharedModule } from '@shared';
import { HeaderComponent, SideBarListComponent } from './components';
import { OverviewComponent } from './overview.component';
import { ComponentOverviewRoutingModule } from './overview.routing';

@NgModule({
    declarations: [
        OverviewComponent,
        SideBarListComponent,
        HeaderComponent
    ],
    imports: [
        ComponentOverviewRoutingModule,
        SharedModule,
        DocumentationModule
    ]
})
export class OverviewModule {}
