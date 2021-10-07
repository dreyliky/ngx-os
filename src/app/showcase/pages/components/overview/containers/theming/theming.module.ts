import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ThemingComponent } from './theming.component';
import { ThemingRoutingModule } from './theming.routing';

@NgModule({
    declarations: [
        ThemingComponent
    ],
    imports: [
        ThemingRoutingModule,
        SharedModule
    ]
})
export class ThemingModule {}
