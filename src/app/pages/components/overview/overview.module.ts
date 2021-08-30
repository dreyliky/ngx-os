import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { DocumentationModule } from '@Features/doc';
import { ApiModule } from './api';
import { ExamplesModule } from './examples';
import { MenuComponent } from './menu';
import { OverviewComponent } from './overview.component';

@NgModule({
    declarations: [
        OverviewComponent,
        MenuComponent
    ],
    imports: [
        SharedModule,
        DocumentationModule,
        ExamplesModule,
        ApiModule
    ]
})
export class OverviewModule {}
