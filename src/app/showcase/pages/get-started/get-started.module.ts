import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { GetStartedComponent } from './get-started.component';
import { GetStartedRoutingModule } from './get-started.routing';

@NgModule({
    declarations: [
        GetStartedComponent
    ],
    imports: [
        GetStartedRoutingModule,
        SharedModule
    ]
})
export class GetStartedModule {}
