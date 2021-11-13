import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { FooterComponent, HeaderModule } from './components';
import { ExampleLayoutComponent, MainLayoutComponent } from './containers';

@NgModule({
    declarations: [
        MainLayoutComponent,
        FooterComponent,
        ExampleLayoutComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        HeaderModule
    ],
    exports: [
        MainLayoutComponent,
        ExampleLayoutComponent
    ]
})
export class LayoutsModule {}
