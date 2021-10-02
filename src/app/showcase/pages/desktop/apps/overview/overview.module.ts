import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { OverviewAppComponent } from './overview.component';

@NgModule({
    declarations: [
        OverviewAppComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        OverviewAppComponent
    ]
})
export class OverviewAppModule {}
