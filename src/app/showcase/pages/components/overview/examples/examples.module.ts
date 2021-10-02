import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ExampleComponent } from './example';
import { ExamplesComponent } from './examples.component';

@NgModule({
    declarations: [
        ExamplesComponent,
        ExampleComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ExamplesComponent
    ]
})
export class ExamplesModule {}
