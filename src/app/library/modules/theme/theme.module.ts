import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AvailableForOsDirective, ForbiddenForOsDirective } from './directives';

@NgModule({
    declarations: [
        AvailableForOsDirective,
        ForbiddenForOsDirective
    ],
    imports: [
        SharedModule
    ],
    exports: [
        AvailableForOsDirective,
        ForbiddenForOsDirective
    ]
})
export class ThemeModule {}
