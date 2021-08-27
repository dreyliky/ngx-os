import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { AuthorComponent, FeaturesComponent, SubheaderComponent } from './blocks';
import { CardComponent } from './components';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';

@NgModule({
    declarations: [
        MainComponent,
        SubheaderComponent,
        FeaturesComponent,
        AuthorComponent,
        CardComponent
    ],
    imports: [
        SharedModule,
        MainRoutingModule
    ]
})
export class MainModule {}
