import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ApiSharedModule } from '../shared';
import { DirectivesApiComponent } from './directives-api.component';

@NgModule({
    declarations: [
        DirectivesApiComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        DirectivesApiComponent
    ]
})
export class DirectivesApiModule {}
