import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxOsModule } from 'ngx-os';
import { CodeViewerComponent, MarkdownViewerComponent } from './components';
import { SafeHtmlPipe } from './pipes';

@NgModule({
    declarations: [
        SafeHtmlPipe,
        CodeViewerComponent,
        MarkdownViewerComponent
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
        CodeViewerComponent,
        MarkdownViewerComponent
    ]
})
export class SharedModule {}
