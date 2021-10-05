import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ElementHeaderComponent } from './element-header';
import { GettersComponent } from './getters';
import { InputsComponent } from './inputs';
import { MethodsComponent } from './methods';
import { OutputsComponent } from './outputs';
import { PropertiesComponent } from './properties';
import { ReadmeInfoComponent } from './readme-info';
import { SelectorComponent } from './selector';
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
        MethodsComponent,
        SelectorComponent
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
        MethodsComponent,
        SelectorComponent
    ]
})
export class ApiSharedModule {}
