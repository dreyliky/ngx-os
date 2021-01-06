import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { LibDescriptionComponent } from './lib-description';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';
import { RndComponentsDemonstrationComponent } from './rnd-components-demonstration';
import { SubheaderComponent } from './subheader';

@NgModule({
    declarations: [
        MainComponent,
        SubheaderComponent,
        LibDescriptionComponent,
        RndComponentsDemonstrationComponent
    ],
    imports: [
        SharedModule,
        MainRoutingModule
    ]
})
export class MainModule {}
