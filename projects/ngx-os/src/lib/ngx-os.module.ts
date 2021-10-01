import { NgModule } from '@angular/core';
import {
    ButtonModule,
    CheckboxModule,
    DragAndDropModule,
    DropdownModule,
    EmailBoxModule,
    FormFieldModule,
    GridModule,
    GroupBoxModule,
    ListModule,
    NumberBoxModule,
    PasswordBoxModule,
    RadioButtonModule,
    ResizerModule,
    ScrollViewModule,
    SliderModule,
    TabGroupModule,
    TextareaBoxModule,
    TextBoxModule,
    TextModule,
    TreeViewModule,
    UtilsModule,
    WindowModule
} from './modules';

@NgModule({
    exports: [
        ButtonModule,
        CheckboxModule,
        DragAndDropModule,
        EmailBoxModule,
        FormFieldModule,
        GridModule,
        GroupBoxModule,
        ListModule,
        NumberBoxModule,
        PasswordBoxModule,
        RadioButtonModule,
        ResizerModule,
        ScrollViewModule,
        DropdownModule,
        SliderModule,
        TabGroupModule,
        TextareaBoxModule,
        TextBoxModule,
        TextModule,
        TreeViewModule,
        UtilsModule,
        WindowModule
    ]
})
export class NgxOsModule {}
