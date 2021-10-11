import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { DocumentationComponent } from './documentation.component';
import { DocumentationRoutingModule } from './documentation.routing';

@NgModule({
    declarations: [
        DocumentationComponent
    ],
    imports: [
        DocumentationRoutingModule,
        SharedModule,
        FeaturesModule
    ]
})
export class DocumentationModule {}
