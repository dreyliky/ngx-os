import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import {
    ButtonOverviewComponent,
    CheckboxOverviewComponent,
    FieldRowOverviewComponent,
    GroupBoxOverviewComponent,
    ListOverviewComponent,
    RadioButtonOverviewComponent,
    ScrollViewOverviewComponent,
    SelectboxOverviewComponent,
    TextOverviewComponent,
    WindowOverviewComponent
} from './demo';

@NgModule({
    declarations: [
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        FieldRowOverviewComponent,
        GroupBoxOverviewComponent,
        ListOverviewComponent,
        RadioButtonOverviewComponent,
        ScrollViewOverviewComponent,
        SelectboxOverviewComponent,
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
        GroupBoxOverviewComponent,
        ListOverviewComponent,
        RadioButtonOverviewComponent,
        ScrollViewOverviewComponent,
        SelectboxOverviewComponent,
        TextOverviewComponent,
        WindowOverviewComponent
    ]
})
export class DocumentationModule {}
