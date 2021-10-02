import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { GridComponent, GridItemComponent } from './components';

@NgModule({
    declarations: [
        GridComponent,
        GridItemComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        GridComponent,
        GridItemComponent
    ]
})
export class GridModule {}
