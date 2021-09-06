import { NgModule } from '@angular/core';
import {
    ButtonModule,
    CheckboxModule,
    DragAndDropModule,
    GridModule,
    GroupBoxModule,
    ListModule,
    RadioButtonModule,
    ResizerModule,
    ScrollViewModule,
    SelectboxModule,
    SliderModule,
    TabGroupModule,
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
        TextModule,
        TextBoxModule,
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
        GridModule,
        DragAndDropModule,
        ResizerModule
    ],
    exports: [
        ButtonModule,
        TextModule,
        TextBoxModule,
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
        GridModule,
        DragAndDropModule,
        ResizerModule
    ]
})
export class OsAngularModule {}
