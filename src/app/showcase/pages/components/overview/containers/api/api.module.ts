import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ApiComponent } from './api.component';
import { ApiRoutingModule } from './api.routing';
import { ClassesApiModule } from './classes-api';
import { ComponentsApiModule } from './components-api';
import { DirectivesApiModule } from './directives-api';
import { EnumsApiModule } from './enums-api';
import { InterfacesApiModule } from './interfaces-api';
import { ModulesApiModule } from './modules-api';
import { ServicesApiModule } from './services-api';
import { ApiSharedModule } from './shared';
import { SideBarApiPlanComponent } from './side-bar-api-plan';
import { TypesApiModule } from './types-api';

@NgModule({
    declarations: [
        ApiComponent,
        SideBarApiPlanComponent
    ],
    imports: [
        ApiRoutingModule,
        SharedModule,
        ApiSharedModule,
        ComponentsApiModule,
        ServicesApiModule,
        DirectivesApiModule,
        ModulesApiModule,
        InterfacesApiModule,
        ClassesApiModule,
        EnumsApiModule,
        TypesApiModule
    ],
    exports: [
        ApiComponent
    ]
})
export class ApiModule {}
