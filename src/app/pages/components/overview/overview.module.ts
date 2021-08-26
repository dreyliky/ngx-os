import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { DocumentationModule } from '@Features/doc';
import { CollapseButtonComponent } from './collapse-button';
import { ComponentBlockComponent } from './component-block';
import { DemoBlockComponent } from './demo-block';
import { EventsComponent } from './events';
import { MenuComponent } from './menu';
import { MethodsComponent } from './methods';
import { OverviewComponent } from './overview.component';
import { PropertiesComponent } from './properties';

@NgModule({
    declarations: [
        OverviewComponent,
        PropertiesComponent,
        MethodsComponent,
        DemoBlockComponent,
        ComponentBlockComponent,
        MenuComponent,
        CollapseButtonComponent,
        EventsComponent
    ],
    imports: [
        SharedModule,
        DocumentationModule
    ]
})
export class OverviewModule {}
