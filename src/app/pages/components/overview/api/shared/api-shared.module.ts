import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ElementHeaderComponent } from './element-header';
import { GettersComponent } from './getters';
import { OutputsComponent } from './outputs';
import { ReadmeInfoComponent } from './readme-info';
import { SettersComponent } from './setters';

@NgModule({
    declarations: [
        ReadmeInfoComponent,
        ElementHeaderComponent,
        GettersComponent,
        SettersComponent,
        OutputsComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ReadmeInfoComponent,
        ElementHeaderComponent,
        GettersComponent,
        SettersComponent,
        OutputsComponent
    ]
})
export class ApiSharedModule {}
