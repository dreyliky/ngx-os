import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';

import {
    ButtonModule,
    CheckboxModule,
    SelectboxModule,
    RadioButtonModule,
    FieldRowModule,
    GroupBoxModule,
    SliderModule,
    TextModule,
    TextBoxModule,
    TextareaBoxModule,
    TabGroupModule,
    WindowModule,
    TreeViewModule,
    ScrollViewModule,
    ListModule,
    DragAndDropModule,
    ResizerModule
} from './modules';

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
        ListModule,
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
        ListModule,
        DragAndDropModule,
        ResizerModule
    ]
})
export class OsAngularModule {}
