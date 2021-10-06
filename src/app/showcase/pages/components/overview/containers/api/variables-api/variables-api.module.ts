import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ApiSharedModule } from '../shared';
import { VariablesApiComponent } from './variables-api.component';

@NgModule({
    declarations: [
        VariablesApiComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        VariablesApiComponent
    ]
})
export class VariablesApiModule {}
