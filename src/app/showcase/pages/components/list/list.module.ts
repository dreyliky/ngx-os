import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { GridComponent } from './list.component';

@NgModule({
    declarations: [
        GridComponent
    ],
    imports: [
        SharedModule
    ]
})
export class GridModule {}
