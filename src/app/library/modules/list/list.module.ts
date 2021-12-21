import { NgModule } from '@angular/core';
import { ScrollViewModule } from '../scroll-view';
import { ɵSharedModule } from '../shared.module';
import { ListComponent, ListItemComponent } from './components';

@NgModule({
    declarations: [
        ListComponent,
        ListItemComponent
    ],
    imports: [
        ɵSharedModule,
        ScrollViewModule
    ],
    exports: [
        ListComponent,
        ListItemComponent
    ]
})
export class ListModule {}
