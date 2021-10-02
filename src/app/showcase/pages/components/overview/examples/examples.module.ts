import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CodeComponent } from './code';
import { ExampleComponent } from './example';
import { ExamplesComponent } from './examples.component';

@NgModule({
    declarations: [
        ExamplesComponent,
        ExampleComponent,
        CodeComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ExamplesComponent
    ]
})
export class ExamplesModule {}
