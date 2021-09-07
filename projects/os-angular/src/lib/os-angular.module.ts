import { NgModule } from '@angular/core';
import {
    ButtonModule,
    CheckboxModule,
    DragAndDropModule,
    EmailBoxModule,
    FieldRowModule,
    GridModule,
    GroupBoxModule,
    ListModule,
    NumberBoxModule,
    RadioButtonModule,
    ResizerModule,
    ScrollViewModule,
    SelectboxModule,
    SliderModule,
    TabGroupModule,
    TextareaBoxModule,
    TextBoxModule,
    TextModule,
    TreeViewModule,
    WindowModule
} from './modules';
import { SharedModule } from './shared.module';

@NgModule({
    imports: [
        SharedModule,

        ButtonModule,
        CheckboxModule,
        DragAndDropModule,
        EmailBoxModule,
        FieldRowModule,
        GridModule,
        GroupBoxModule,
        ListModule,
        NumberBoxModule,
        RadioButtonModule,
        ResizerModule,
        ScrollViewModule,
        SelectboxModule,
        SliderModule,
        TabGroupModule,
        TextareaBoxModule,
        TextBoxModule,
        TextModule,
        TreeViewModule,
        WindowModule
    ],
    exports: [
        ButtonModule,
        CheckboxModule,
        DragAndDropModule,
        EmailBoxModule,
        FieldRowModule,
        GridModule,
        GroupBoxModule,
        ListModule,
        NumberBoxModule,
        RadioButtonModule,
        ResizerModule,
        ScrollViewModule,
        SelectboxModule,
        SliderModule,
        TabGroupModule,
        TextareaBoxModule,
        TextBoxModule,
        TextModule,
        TreeViewModule,
        WindowModule
    ]
})
export class OsAngularModule {}
