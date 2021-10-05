import { NgModule } from '@angular/core';
import { DocumentationComponent } from './documentation.component';
import { DocumentationRoutingModule } from './documentation.routing';

@NgModule({
    declarations: [
        DocumentationComponent
    ],
    imports: [
        DocumentationRoutingModule
    ]
})
export class DocumentationModule {}
