import { NgModule } from '@angular/core';
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
        SharedModule
    ],
    exports: [
        ExamplesComponent
    ]
})
export class ExamplesModule {}
