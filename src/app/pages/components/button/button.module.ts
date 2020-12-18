import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/doc-shared.module';
import { ButtonComponent } from './button.component';
import { ButtonRoutingModule } from './button.routing';

@NgModule({
    declarations: [
        ButtonComponent
    ],
    imports: [
        SharedModule,
        ButtonRoutingModule
    ]
})
export class ButtonModule {}
