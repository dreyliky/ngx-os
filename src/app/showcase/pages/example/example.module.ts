import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ExampleComponent } from './example.component';
import { ComponentExampleRoutingModule } from './example.routing';

@NgModule({
    declarations: [
        ExampleComponent
    ],
    imports: [
        SharedModule,
        ComponentExampleRoutingModule
    ]
})
export class ExamplePageModule {}
