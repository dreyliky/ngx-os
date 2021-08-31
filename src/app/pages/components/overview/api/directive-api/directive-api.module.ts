import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ApiSharedModule } from '../shared';
import { DirectiveApiComponent } from './directive-api.component';
import { EventsComponent } from './events';
import { MethodsComponent } from './methods';
import { PropertiesComponent } from './properties';

@NgModule({
    declarations: [
        DirectiveApiComponent,
        PropertiesComponent,
        MethodsComponent,
        EventsComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        DirectiveApiComponent
    ]
})
export class DirectiveApiModule {}
