import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UtilsModule } from './utils';

/** @internal */
@NgModule({
    imports: [
        CommonModule,
        UtilsModule
    ],
    exports: [
        CommonModule,
        UtilsModule
    ]
})
export class ɵSharedModule {}
