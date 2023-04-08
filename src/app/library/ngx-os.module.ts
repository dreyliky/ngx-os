import { NgModule } from '@angular/core';
import {
    ButtonModule,
    CheckboxModule,
    ContextMenuModule,
    DividerModule,
    DragAndDropModule,
    DropdownModule,
    FormFieldModule,
    GridModule,
    GroupBoxModule,
    HintModule,
    InputModule,
    ListModule,
    MenuBarModule,
    RadioButtonModule,
    ResizerModule,
    ScrollViewModule,
    SelectionModule,
    SliderModule,
    TabGroupModule,
    TextModule,
    ThemeModule,
    TreeViewModule,
    UtilsModule,
    WindowModule
} from './modules/public-api';

@NgModule({
    exports: [
        ButtonModule,
        CheckboxModule,
        ContextMenuModule,
        DividerModule,
        DragAndDropModule,
        DropdownModule,
        FormFieldModule,
        GridModule,
        GroupBoxModule,
        HintModule,
        InputModule,
        ListModule,
        MenuBarModule,
        RadioButtonModule,
        ResizerModule,
        ScrollViewModule,
        SelectionModule,
        SliderModule,
        TabGroupModule,
        TextModule,
        ThemeModule,
        TreeViewModule,
        UtilsModule,
        WindowModule
    ]
})
export class NgxOsModule {}
