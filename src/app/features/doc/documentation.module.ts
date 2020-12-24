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
    SliderOverviewComponent,
    TabGroupOverviewComponent,
    TextBoxOverviewComponent,
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
        SliderOverviewComponent,
        TabGroupOverviewComponent,
        TextOverviewComponent,
        TextBoxOverviewComponent,
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
        SliderOverviewComponent,
        TabGroupOverviewComponent,
        TextOverviewComponent,
        TextBoxOverviewComponent,
        WindowOverviewComponent
    ]
})
export class DocumentationModule {}
