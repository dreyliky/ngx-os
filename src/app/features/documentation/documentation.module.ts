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
import { ThemeDifferentStylingComponent } from './examples/theme/theme-different-styling/theme-different-styling.component';

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
        WindowTitleBarComponent,
        ThemeDifferentStylingComponent
    ],
    imports: [
        SharedModule
    ]
})
export class DocumentationModule {}
