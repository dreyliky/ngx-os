import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { EmptyWindowComponent, MenuBarModule } from './components';
import { ExperimentsAppComponent } from './experiments.component';

@NgModule({
    declarations: [
        ExperimentsAppComponent,
        EmptyWindowComponent
    ],
    imports: [
        SharedModule,
        MenuBarModule
    ]
})
export class ExperimentsAppModule {}
