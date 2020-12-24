import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import {
    ButtonOverviewComponent,
    CheckboxOverviewComponent,
    FieldRowOverviewComponent,
    GroupBoxOverviewComponent,
    ListOverviewComponent,
    RadioButtonOverviewComponent,
    ScrollViewOverviewComponent,
    SelectboxOverviewComponent,
    TextOverviewComponent,
    WindowOverviewComponent
} from './demo';
import { SliderOverviewComponent } from './demo/slider/slider-overview/slider-overview.component';

@NgModule({
    declarations: [
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        FieldRowOverviewComponent,
        GroupBoxOverviewComponent,
        ListOverviewComponent,
        RadioButtonOverviewComponent,
        ScrollViewOverviewComponent,
        SelectboxOverviewComponent,
        SliderOverviewComponent,
        TextOverviewComponent,
        WindowOverviewComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ButtonOverviewComponent,
        CheckboxOverviewComponent,
        FieldRowOverviewComponent,
        GroupBoxOverviewComponent,
        ListOverviewComponent,
        RadioButtonOverviewComponent,
        ScrollViewOverviewComponent,
        SelectboxOverviewComponent,
        SliderOverviewComponent,
        TextOverviewComponent,
        WindowOverviewComponent
    ]
})
export class DocumentationModule {}
