import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { DocumentationModule } from '@Features/doc';
import { ApiModule } from './api';
import { ExamplesModule } from './examples';
import { HeaderComponent } from './header';
import { MenuComponent } from './menu';
import { OverviewComponent } from './overview.component';

@NgModule({
    declarations: [
        OverviewComponent,
        MenuComponent,
        HeaderComponent
    ],
    imports: [
        SharedModule,
        DocumentationModule,
        ExamplesModule,
        ApiModule
    ]
})
export class OverviewModule {}
