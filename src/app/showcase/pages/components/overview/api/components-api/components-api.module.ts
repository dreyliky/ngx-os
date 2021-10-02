import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
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
