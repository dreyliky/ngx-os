import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { DocumentationModule } from '@Doc/features/doc';
import { PageStructureComponent } from './page-structure.component';
import { PropertiesComponent } from './properties';
import { MethodsComponent } from './methods';

@NgModule({
    declarations: [
        PageStructureComponent,
        PropertiesComponent,
        MethodsComponent
    ],
    imports: [
        SharedModule,
        DocumentationModule
    ]
})
export class PageStructureModule {}
