import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import {
    ButtonOverviewComponent,
    CheckboxOverviewComponent,
    FieldRowOverviewComponent,
    TextOverviewComponent,
    WindowOverviewComponent
} from './demo';

@NgModule({
    declarations: [
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        FieldRowOverviewComponent,
        TextOverviewComponent,
        WindowOverviewComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        FieldRowOverviewComponent,
        TextOverviewComponent,
        WindowOverviewComponent
    ]
})
export class DocumentationModule {}
