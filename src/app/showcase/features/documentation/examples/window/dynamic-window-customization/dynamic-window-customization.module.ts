import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
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
