import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { FooterComponent, HeaderModule } from './components';
import { MainLayoutComponent } from './containers';

@NgModule({
    declarations: [
        MainLayoutComponent,
        FooterComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        HeaderModule
    ],
    exports: [
        MainLayoutComponent
    ]
})
export class LayoutsModule {}
