import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/app-shared.module';
import { HelloWorldWindowComponent } from './components';
import { DemoWindowComponent } from './components/demo-window/demo-window.component';

@NgModule({
    declarations: [
        HelloWorldWindowComponent,
        DemoWindowComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        HelloWorldWindowComponent
    ],
    entryComponents: [
        HelloWorldWindowComponent,
        DemoWindowComponent
    ]
})
export class TestModule {}
