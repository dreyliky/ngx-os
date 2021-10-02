import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { EmptyWindowComponent } from './components';
import { ExperimentsAppComponent } from './experiments.component';

@NgModule({
    declarations: [
        ExperimentsAppComponent,
        EmptyWindowComponent
    ],
    imports: [
        SharedModule
    ]
})
export class ExperimentsAppModule {}
