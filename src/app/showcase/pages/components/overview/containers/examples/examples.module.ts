import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { ExampleComponent } from './example';
import { ExamplesComponent } from './examples.component';
import { ExamplesComponentRoutingModule } from './examples.routing';

@NgModule({
    declarations: [
        ExamplesComponent,
        ExampleComponent
    ],
    imports: [
        ExamplesComponentRoutingModule,
        SharedModule,
        FeaturesModule
    ],
    exports: [
        ExamplesComponent
    ]
})
export class ExamplesModule {}
