import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ApiSharedModule } from '../shared';
import { ServicesApiComponent } from './services-api.component';

@NgModule({
    declarations: [
        ServicesApiComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        ServicesApiComponent
    ]
})
export class ServicesApiModule {}
