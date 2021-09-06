import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import {
    ButtonCounterComponent,
    ButtonOverviewComponent,
    CheckboxOverviewComponent,
    DraggerOverviewComponent,
    GridOverviewComponent,
    GroupBoxOverviewComponent,
    ListOverviewComponent,
    RadioButtonOverviewComponent,
    ResizerOverviewComponent,
    ScrollViewOverviewComponent,
    SelectboxOverviewComponent,
    SliderOverviewComponent,
    TabGroupOverviewComponent,
    TextareaOverviewComponent,
    TextBoxOverviewComponent,
    TextOverviewComponent,
    ThemeOverviewComponent,
    TreeViewOverviewComponent,
    WindowDynamicOpeningComponent,
    WindowOverviewComponent,
    WindowTitleBarComponent
} from './demo';
import { FieldRowOverviewComponent } from './demo/text-box/field-row-overview/field-row-overview.component';

@NgModule({
    declarations: [
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        GroupBoxOverviewComponent,
        GridOverviewComponent,
        RadioButtonOverviewComponent,
        ScrollViewOverviewComponent,
        SelectboxOverviewComponent,
        SliderOverviewComponent,
        TabGroupOverviewComponent,
        TextOverviewComponent,
        TextBoxOverviewComponent,
        TextareaOverviewComponent,
        TreeViewOverviewComponent,
        WindowOverviewComponent,
        ListOverviewComponent,
        ButtonCounterComponent,
        WindowDynamicOpeningComponent,
        WindowTitleBarComponent,
        ThemeOverviewComponent,
        DraggerOverviewComponent,
        ResizerOverviewComponent,
        FieldRowOverviewComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        GroupBoxOverviewComponent,
        GridOverviewComponent,
        RadioButtonOverviewComponent,
        ScrollViewOverviewComponent,
        SelectboxOverviewComponent,
        SliderOverviewComponent,
        TabGroupOverviewComponent,
        TextOverviewComponent,
        TextBoxOverviewComponent,
        TextareaOverviewComponent,
        TreeViewOverviewComponent,
        WindowOverviewComponent,
        WindowDynamicOpeningComponent,
        WindowTitleBarComponent
    ]
})
export class DocumentationModule {}
