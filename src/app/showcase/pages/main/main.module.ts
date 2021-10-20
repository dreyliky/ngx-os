import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CardComponent } from './components';
import {
    AuthorComponent,
    FeaturesComponent,
    SubheaderComponent,
    SupportComponent
} from './containers';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';

@NgModule({
    declarations: [
        MainComponent,
        SubheaderComponent,
        FeaturesComponent,
        SupportComponent,
        AuthorComponent,
        CardComponent
    ],
    imports: [
        SharedModule,
        MainRoutingModule
    ]
})
export class MainModule {}
