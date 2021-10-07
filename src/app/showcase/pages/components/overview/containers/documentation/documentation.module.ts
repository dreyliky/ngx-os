import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DocumentationComponent } from './documentation.component';
import { DocumentationRoutingModule } from './documentation.routing';

@NgModule({
    declarations: [
        DocumentationComponent
    ],
    imports: [
        SharedModule,
        DocumentationRoutingModule
    ]
})
export class DocumentationModule {}
