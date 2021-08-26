import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
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
