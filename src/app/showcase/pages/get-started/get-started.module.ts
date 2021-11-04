import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { ContentComponent } from './content';
import { GetStartedComponent } from './get-started.component';
import { GetStartedRoutingModule } from './get-started.routing';
import { SideBarComponent } from './side-bar';

@NgModule({
    declarations: [
        GetStartedComponent,
        SideBarComponent,
        ContentComponent
    ],
    imports: [
        GetStartedRoutingModule,
        SharedModule,
        FeaturesModule
    ]
})
export class GetStartedModule {}
