import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ApiSharedModule } from '../shared';
import { ModulesApiComponent } from './modules-api.component';

@NgModule({
    declarations: [
        ModulesApiComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        ModulesApiComponent
    ]
})
export class ModulesApiModule {}
