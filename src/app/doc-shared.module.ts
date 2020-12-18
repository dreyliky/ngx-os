import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsAngularModule } from 'projects/os-angular/src/public-api';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [
        CommonModule,
        RouterModule,

        OsAngularModule
    ]
})
export class SharedModule {}
