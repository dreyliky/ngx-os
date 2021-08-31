import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
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
        SharedModule
    ],
    exports: [
        DirectiveApiComponent
    ]
})
export class DirectiveApiModule {}
