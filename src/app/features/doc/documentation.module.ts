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
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        FieldRowOverviewComponent,
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
        ResizerOverviewComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        FieldRowOverviewComponent,
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
