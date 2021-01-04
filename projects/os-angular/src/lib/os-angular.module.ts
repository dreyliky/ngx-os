import { NgModule } from '@angular/core';
import {
    ButtonModule, CheckboxModule,
    DragAndDropModule, FieldRowModule,
    GridModule, GroupBoxModule, RadioButtonModule,
    ResizerModule, ScrollViewModule, SelectboxModule,
    SliderModule, TabGroupModule, TextareaBoxModule,
    TextBoxModule, TextModule, TreeViewModule, WindowModule
} from './modules';
import { SharedModule } from './shared.module';

@NgModule({
    imports: [
        SharedModule,

        ButtonModule,
        FieldRowModule,
        TextModule,
        TextBoxModule,
        TextareaBoxModule,
        CheckboxModule,
        SelectboxModule,
        RadioButtonModule,
        GroupBoxModule,
        SliderModule,
        TabGroupModule,
        WindowModule,
        TreeViewModule,
        ScrollViewModule,
        GridModule,
        DragAndDropModule,
        ResizerModule
    ],
    exports: [
        ButtonModule,
        FieldRowModule,
        TextModule,
        TextBoxModule,
        TextareaBoxModule,
        CheckboxModule,
        SelectboxModule,
        RadioButtonModule,
        GroupBoxModule,
        SliderModule,
        TabGroupModule,
        WindowModule,
        TreeViewModule,
        ScrollViewModule,
        GridModule,
        DragAndDropModule,
        ResizerModule
    ]
})
export class OsAngularModule {}
