import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/doc-shared.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        SharedModule,
        MainRoutingModule
    ]
})
export class MainModule {}
