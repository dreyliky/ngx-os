import { NgModule } from '@angular/core';
import { ScrollViewModule } from '@lib-modules/scroll-view';
import { SharedModule } from '@lib-shared';
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
