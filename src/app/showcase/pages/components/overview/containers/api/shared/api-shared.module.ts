import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { ElementHeaderComponent } from './element-header';
import { GetterFormatterPipe, GettersComponent } from './getters';
import { InputFormatterPipe, InputsComponent } from './inputs';
import { MethodFormatterPipe, MethodsComponent } from './methods';
import { OutputFormatterPipe, OutputsComponent } from './outputs';
import { PropertiesComponent, PropertyFormatterPipe } from './properties';
import { ReadmeInfoComponent } from './readme-info';
import { SelectorComponent } from './selector';
import { SetterFormatterPipe, SettersComponent } from './setters';

@NgModule({
    declarations: [
        ReadmeInfoComponent,
        ElementHeaderComponent,
        GetterFormatterPipe,
        GettersComponent,
        SetterFormatterPipe,
        SettersComponent,
        InputFormatterPipe,
        InputsComponent,
        OutputFormatterPipe,
        OutputsComponent,
        PropertyFormatterPipe,
        PropertiesComponent,
        MethodFormatterPipe,
        MethodsComponent,
        SelectorComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule
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
