import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ReadmeInfoComponent } from './readme-info';

@NgModule({
    declarations: [
        ReadmeInfoComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ReadmeInfoComponent
    ]
})
export class ApiSharedModule {}
