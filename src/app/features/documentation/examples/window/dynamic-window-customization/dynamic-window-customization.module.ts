import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import {
    DynamicWindowCustomizationComponent,
    MyAppComponent,
    MyAppTitleBarComponent
} from './dynamic-window-customization.component';

@NgModule({
    declarations: [
        DynamicWindowCustomizationComponent,
        MyAppComponent,
        MyAppTitleBarComponent
    ],
    imports: [
        SharedModule
    ]
})
export class DynamicWindowCustomizationModule {}
