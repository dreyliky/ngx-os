import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import {
    ButtonCounterComponent,
    ButtonOverviewComponent,
    CheckboxAsFormControlComponent,
    CheckboxOverviewComponent,
    DraggerOverviewComponent,
    EmailBoxOverviewComponent,
    FormFieldOverviewComponent,
    GridOverviewComponent,
    GroupBoxOverviewComponent,
    ListCustomTemplateComponent,
    ListOverviewComponent,
    NumberBoxOverviewComponent,
    PasswordBoxOverviewComponent,
    RadioButtonAsFormControlComponent,
    RadioButtonOverviewComponent,
    ResizerOverviewComponent,
    ScrollViewOverviewComponent,
    SelectboxAsFormControlComponent,
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
} from './examples';

@NgModule({
    declarations: [
        ButtonCounterComponent,
        ButtonOverviewComponent,
        CheckboxAsFormControlComponent,
        CheckboxOverviewComponent,
        DraggerOverviewComponent,
        EmailBoxOverviewComponent,
        FormFieldOverviewComponent,
        GridOverviewComponent,
        GroupBoxOverviewComponent,
        ListCustomTemplateComponent,
        ListOverviewComponent,
        NumberBoxOverviewComponent,
        PasswordBoxOverviewComponent,
        RadioButtonAsFormControlComponent,
        RadioButtonOverviewComponent,
        ResizerOverviewComponent,
        ScrollViewOverviewComponent,
        SelectboxAsFormControlComponent,
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
    ]
})
export class DocumentationModule {}
