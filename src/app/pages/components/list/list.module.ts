import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
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
