import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ElementHeaderComponent } from './element-header';
import { GettersComponent } from './getters';
import { MethodsComponent } from './methods';
import { OutputsComponent } from './outputs';
import { ReadmeInfoComponent } from './readme-info';
import { SettersComponent } from './setters';

@NgModule({
    declarations: [
        ReadmeInfoComponent,
        ElementHeaderComponent,
        GettersComponent,
        SettersComponent,
        OutputsComponent,
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
        OutputsComponent,
        MethodsComponent
    ]
})
export class ApiSharedModule {}
