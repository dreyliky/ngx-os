import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { GetStartedComponent } from './get-started.component';
import { GetStartedRoutingModule } from './get-started.routing';

@NgModule({
    declarations: [
        GetStartedComponent
    ],
    imports: [
        GetStartedRoutingModule,
        SharedModule,
        FeaturesModule
    ]
})
export class GetStartedModule {}
