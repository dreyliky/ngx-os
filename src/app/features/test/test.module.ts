import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/app-shared.module';
import { HelloWorldWindowComponent } from './components';
import { DemoWindowComponent } from './components/demo-window/demo-window.component';
import { SurvivWindowComponent } from './components/surviv-window/surviv-window.component';

@NgModule({
    declarations: [
        HelloWorldWindowComponent,
        DemoWindowComponent,
        SurvivWindowComponent
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
        SurvivWindowComponent
    ]
})
export class TestModule {}
