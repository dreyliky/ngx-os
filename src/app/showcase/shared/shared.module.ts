import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxOsModule } from 'ngx-os';
import { LoaderComponent } from './components';
import { SafeHtmlPipe } from './pipes';

@NgModule({
    declarations: [
        SafeHtmlPipe,
        LoaderComponent
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

        SafeHtmlPipe,
        LoaderComponent
    ]
})
export class SharedModule {}
