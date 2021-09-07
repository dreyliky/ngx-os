import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import {
    ButtonCounterComponent,
    ButtonOverviewComponent,
    CheckboxOverviewComponent,
    DraggerOverviewComponent,
    FieldRowOverviewComponent,
    GridOverviewComponent,
    GroupBoxOverviewComponent,
    ListOverviewComponent,
    NumberBoxOverviewComponent,
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

@NgModule({
    declarations: [
        ButtonCounterComponent,
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        DraggerOverviewComponent,
        FieldRowOverviewComponent,
        GridOverviewComponent,
        GroupBoxOverviewComponent,
        ListOverviewComponent,
        NumberBoxOverviewComponent,
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
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ButtonCounterComponent,
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        DraggerOverviewComponent,
        FieldRowOverviewComponent,
        GridOverviewComponent,
        GroupBoxOverviewComponent,
        ListOverviewComponent,
        NumberBoxOverviewComponent,
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
    ]
})
export class DocumentationModule {}
