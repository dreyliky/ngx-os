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
    NumberBoxAsFormControlComponent,
    NumberBoxOverviewComponent,
    PasswordBoxAsFormControlComponent,
    PasswordBoxOverviewComponent,
    RadioButtonAsFormControlComponent,
    RadioButtonOverviewComponent,
    ResizerOverviewComponent,
    ScrollViewOverviewComponent,
    SelectboxAsFormControlComponent,
    SelectboxOverviewComponent,
    SliderOverviewComponent,
    TabGroupOverviewComponent,
    TextareaAsFormControlComponent,
    TextareaOverviewComponent,
    TextBoxAsFormControlComponent,
    TextBoxOverviewComponent,
    TextOverviewComponent,
    ThemeDifferentStylingComponent,
    ThemeOverviewComponent,
    TreeViewOverviewComponent,
    WindowDynamicOpeningComponent,
    WindowOverviewComponent,
    WindowTitleBarComponent
} from './examples';
import { EmailBoxAsFormControlComponent } from './examples/email-box/email-box-as-form-control/email-box-as-form-control.component';

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
        NumberBoxAsFormControlComponent,
        NumberBoxOverviewComponent,
        PasswordBoxAsFormControlComponent,
        PasswordBoxOverviewComponent,
        RadioButtonAsFormControlComponent,
        RadioButtonOverviewComponent,
        ResizerOverviewComponent,
        ScrollViewOverviewComponent,
        SelectboxAsFormControlComponent,
        SelectboxOverviewComponent,
        SliderOverviewComponent,
        TabGroupOverviewComponent,
        TextareaAsFormControlComponent,
        TextareaOverviewComponent,
        TextBoxAsFormControlComponent,
        TextBoxOverviewComponent,
        TextOverviewComponent,
        ThemeDifferentStylingComponent,
        ThemeOverviewComponent,
        TreeViewOverviewComponent,
        WindowDynamicOpeningComponent,
        WindowOverviewComponent,
        WindowTitleBarComponent,
        EmailBoxAsFormControlComponent
    ],
    imports: [
        SharedModule
    ]
})
export class DocumentationModule {}
