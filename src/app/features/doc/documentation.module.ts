import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import {
    ButtonOverviewComponent,
    CheckboxOverviewComponent,
    FieldRowOverviewComponent,
    GroupBoxOverviewComponent,
    TextOverviewComponent,
    WindowOverviewComponent
} from './demo';

@NgModule({
    declarations: [
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        FieldRowOverviewComponent,
        TextOverviewComponent,
        WindowOverviewComponent,
        GroupBoxOverviewComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        FieldRowOverviewComponent,
        GroupBoxOverviewComponent,
        TextOverviewComponent,
        WindowOverviewComponent
    ]
})
export class DocumentationModule {}
