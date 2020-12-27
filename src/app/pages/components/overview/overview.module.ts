import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { DocumentationModule } from '@Doc/features/doc';
import { ComponentBlockComponent } from './component-block';
import { DemoBlockComponent } from './demo-block';
import { MenuComponent } from './menu';
import { MethodsComponent } from './methods';
import { OverviewComponent } from './overview.component';
import { PropertiesComponent } from './properties';
import { CollapseButtonComponent } from './collapse-button/collapse-button.component';

@NgModule({
    declarations: [
        OverviewComponent,
        PropertiesComponent,
        MethodsComponent,
        DemoBlockComponent,
        ComponentBlockComponent,
        MenuComponent,
        CollapseButtonComponent
    ],
    imports: [
        SharedModule,
        DocumentationModule
    ]
})
export class OverviewModule {}
