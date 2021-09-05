import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ApiSharedModule } from '../shared';
import { DirectivesApiComponent } from './directives-api.component';
import { MethodsComponent } from './methods';
import { PropertiesComponent } from './properties';

@NgModule({
    declarations: [
        DirectivesApiComponent,
        PropertiesComponent,
        MethodsComponent
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
