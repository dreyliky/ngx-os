import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import {
    ButtonOverviewComponent,
    CheckboxOverviewComponent,
    TextOverviewComponent,
    WindowOverviewComponent
} from './demo';

@NgModule({
    declarations: [
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        TextOverviewComponent,
        WindowOverviewComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        TextOverviewComponent,
        WindowOverviewComponent
    ]
})
export class DocumentationModule {}
