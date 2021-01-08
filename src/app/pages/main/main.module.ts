import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { LibDescriptionComponent } from './lib-description';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';
import { SubheaderComponent } from './subheader';

@NgModule({
    declarations: [
        MainComponent,
        SubheaderComponent,
        LibDescriptionComponent
    ],
    imports: [
        SharedModule,
        MainRoutingModule
    ]
})
export class MainModule {}
