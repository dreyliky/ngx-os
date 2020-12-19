import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';

import {
    ButtonOverviewComponent
} from './demo';

@NgModule({
    declarations: [
        ButtonOverviewComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ButtonOverviewComponent
    ]
})
export class DocumentationModule {}
