import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { ApiSharedModule } from '../shared';
import { ModulesApiComponent } from './modules-api.component';

@NgModule({
    declarations: [
        ModulesApiComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        ApiSharedModule
    ],
    exports: [
        ModulesApiComponent
    ]
})
export class ModulesApiModule {}
