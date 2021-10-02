import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxOsModule } from 'ngx-os';
import { CodeComponent } from './components';

@NgModule({
    declarations: [
        CodeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxOsModule
    ],
    exports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxOsModule,

        CodeComponent
    ]
})
export class SharedModule {}
