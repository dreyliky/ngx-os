import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/doc-shared.module';
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
        SharedModule
    ]
})
export class PageStructureModule {}
