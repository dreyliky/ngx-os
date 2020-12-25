import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ThemingComponent } from './theming.component';
import { ThemingRoutingModule } from './theming.routing';

@NgModule({
    declarations: [
        ThemingComponent
    ],
    imports: [
        SharedModule,
        ThemingRoutingModule
    ]
})
export class ThemingModule {}
