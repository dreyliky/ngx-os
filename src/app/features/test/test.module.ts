import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import {
    HelloWorldWindowComponent,
    DemoWindowComponent,
    DemoWin10WindowComponent,
    FullscreenTestAppComponent
} from './components';

@NgModule({
    declarations: [
        HelloWorldWindowComponent,
        DemoWindowComponent,
        DemoWin10WindowComponent,
        FullscreenTestAppComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        HelloWorldWindowComponent,
        DemoWindowComponent,
        DemoWin10WindowComponent,
        FullscreenTestAppComponent
    ],
    entryComponents: [
        HelloWorldWindowComponent,
        DemoWindowComponent,
        DemoWin10WindowComponent,
        FullscreenTestAppComponent
    ]
})
export class TestModule {}
