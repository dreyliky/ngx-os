import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsAngularModule } from 'projects/os-angular/src/public-api';

@NgModule({
    exports: [
        CommonModule,

        OsAngularModule
    ]
})
export class SharedModule {}
