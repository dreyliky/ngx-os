import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { ListComponent, ListItemComponent } from './components';

@NgModule({
    declarations: [
        ListComponent,
        ListItemComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ListComponent,
        ListItemComponent
    ]
})
export class ListModule {}
