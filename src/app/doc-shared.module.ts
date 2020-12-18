import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsAngularModule } from 'projects/os-angular/src/public-api';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ComponentPropertyComponent } from './core/components/component-property/component-property.component';

@NgModule({
    exports: [
        CommonModule,
        RouterModule,
        HttpClientModule,

        OsAngularModule
    ],
    declarations: [ComponentPropertyComponent]
})
export class SharedModule {}
