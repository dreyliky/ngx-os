import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
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
