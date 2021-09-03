import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { DocumentationModule } from '@Features/doc';
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
