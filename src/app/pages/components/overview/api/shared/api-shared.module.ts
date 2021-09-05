import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ElementHeaderComponent } from './element-header';
import { GettersComponent } from './getters';
import { InputsComponent } from './inputs';
import { MethodsComponent } from './methods';
import { OutputsComponent } from './outputs';
import { PropertiesComponent } from './properties';
import { ReadmeInfoComponent } from './readme-info';
import { SettersComponent } from './setters';

@NgModule({
    declarations: [
        ReadmeInfoComponent,
        ElementHeaderComponent,
        GettersComponent,
        SettersComponent,
        InputsComponent,
        OutputsComponent,
        PropertiesComponent,
        MethodsComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ReadmeInfoComponent,
        ElementHeaderComponent,
        GettersComponent,
        SettersComponent,
        InputsComponent,
        OutputsComponent,
        PropertiesComponent,
        MethodsComponent
    ]
})
export class ApiSharedModule {}
