import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ElementHeaderComponent } from './element-header';
import { ReadmeInfoComponent } from './readme-info';

@NgModule({
    declarations: [
        ReadmeInfoComponent,
        ElementHeaderComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ReadmeInfoComponent,
        ElementHeaderComponent
    ]
})
export class ApiSharedModule {}
