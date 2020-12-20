import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { DocumentationModule } from '@Doc/features/doc';
import { OverviewComponent } from './overview.component';
import { PropertiesComponent } from './properties';
import { MethodsComponent } from './methods';
import { DemoBlockComponent } from './demo-block';
import { ComponentBlockComponent } from './component-block/component-block.component';

@NgModule({
    declarations: [
        OverviewComponent,
        PropertiesComponent,
        MethodsComponent,
        DemoBlockComponent,
        ComponentBlockComponent
    ],
    imports: [
        SharedModule,
        DocumentationModule
    ]
})
export class OverviewModule {}
