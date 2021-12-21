import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { GridComponent, GridItemComponent } from './components';

@NgModule({
    declarations: [
        GridComponent,
        GridItemComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        GridComponent,
        GridItemComponent
    ]
})
export class GridModule {}
