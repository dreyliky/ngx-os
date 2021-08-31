import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ApiSharedModule } from '../shared';
import { ModuleApiComponent } from './module-api.component';

@NgModule({
    declarations: [
        ModuleApiComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        ModuleApiComponent
    ]
})
export class ModuleApiModule {}
