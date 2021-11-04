import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { ContentComponent } from './content';
import { GuidesComponent } from './guides.component';
import { GuidesRoutingModule } from './guides.routing';
import { SideBarComponent } from './side-bar';

@NgModule({
    declarations: [
        GuidesComponent,
        SideBarComponent,
        ContentComponent
    ],
    imports: [
        GuidesRoutingModule,
        SharedModule,
        FeaturesModule
    ]
})
export class GuidesModule {}
