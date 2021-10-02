import { NgModule } from '@angular/core';
import { ScrollViewModule } from '../scroll-view';
import { SharedModule } from '../shared.module';
import { ListComponent, ListItemComponent } from './components';

@NgModule({
    declarations: [
        ListComponent,
        ListItemComponent
    ],
    imports: [
        SharedModule,
        ScrollViewModule
    ],
    exports: [
        ListComponent,
        ListItemComponent
    ]
})
export class ListModule {}
