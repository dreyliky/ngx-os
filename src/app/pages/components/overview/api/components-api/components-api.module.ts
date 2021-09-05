import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ApiSharedModule } from '../shared';
import { ComponentsApiComponent } from './components-api.component';

@NgModule({
    declarations: [
        ComponentsApiComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        ComponentsApiComponent
    ]
})
export class ComponentsApiModule {}
