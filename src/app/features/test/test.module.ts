import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/app-shared.module';
import { HelloWorldWindowComponent } from './components';

@NgModule({
    declarations: [
        HelloWorldWindowComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        HelloWorldWindowComponent
    ],
    entryComponents: [
        HelloWorldWindowComponent
    ]
})
export class TestModule {}
