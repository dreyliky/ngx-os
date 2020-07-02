import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/app-shared.module';
import {
    HelloWorldWindowComponent,
    DemoWindowComponent,
    SurvivWindowComponent,
    DemoWin10WindowComponent
} from './components';

@NgModule({
    declarations: [
        HelloWorldWindowComponent,
        DemoWindowComponent,
        SurvivWindowComponent,
        DemoWin10WindowComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        HelloWorldWindowComponent
    ],
    entryComponents: [
        HelloWorldWindowComponent,
        DemoWindowComponent,
        SurvivWindowComponent,
        DemoWin10WindowComponent
    ]
})
export class TestModule {}
