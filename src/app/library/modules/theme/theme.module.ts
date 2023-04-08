import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { AvailableForOsDirective, ForbiddenForOsDirective } from './directives';

@NgModule({
    declarations: [
        AvailableForOsDirective,
        ForbiddenForOsDirective
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        AvailableForOsDirective,
        ForbiddenForOsDirective
    ]
})
export class ThemeModule {}
