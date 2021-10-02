import { NgModule } from '@angular/core';
import { DocumentationModule } from '@features/documentation';
import { SharedModule } from '@shared';
import { ApiModule } from './api';
import { ExamplesModule } from './examples';
import { HeaderComponent } from './header';
import { OverviewComponent } from './overview.component';
import { SideBarApiPlanComponent } from './side-bar-api-plan';
import { SideBarListComponent } from './side-bar-list';

@NgModule({
    declarations: [
        OverviewComponent,
        SideBarListComponent,
        HeaderComponent,
        SideBarApiPlanComponent
    ],
    imports: [
        SharedModule,
        DocumentationModule,
        ExamplesModule,
        ApiModule
    ]
})
export class OverviewModule {}
