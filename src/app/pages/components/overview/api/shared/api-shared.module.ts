import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ElementHeaderComponent } from './element-header';
import { GettersComponent } from './getters';
import { ReadmeInfoComponent } from './readme-info';
import { SettersComponent } from './setters';

@NgModule({
    declarations: [
        ReadmeInfoComponent,
        ElementHeaderComponent,
        GettersComponent,
        SettersComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ReadmeInfoComponent,
        ElementHeaderComponent,
        GettersComponent,
        SettersComponent
    ]
})
export class ApiSharedModule {}
