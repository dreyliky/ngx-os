import { Injectable, Injector } from '@angular/core';
import { ResizableDirective } from '../directives';
import { ResizerEnum } from '../enums';
import { ɵBaseResizer } from './base-resizer';
import { ɵBottomLeftResizer } from './bottom-left-resizer';
import { ɵBottomResizer } from './bottom-resizer';
import { ɵBottomRightResizer } from './bottom-right-resizer';
import { ɵLeftResizer } from './left-resizer';
import { ɵRightResizer } from './right-resizer';
import { ɵTopLeftResizer } from './top-left-resizer';
import { ɵTopResizer } from './top-resizer';
import { ɵTopRightResizer } from './top-right-resizer';

/** @internal */
@Injectable()
export class ɵResizerFactory {
    private readonly resizers = [
        ɵTopLeftResizer,
        ɵTopResizer,
        ɵTopRightResizer,
        ɵLeftResizer,
        ɵRightResizer,
        ɵBottomLeftResizer,
        ɵBottomResizer,
        ɵBottomRightResizer
    ];

    constructor(
        private readonly injector: Injector
    ) {}

    public create(id: ResizerEnum, context: ResizableDirective): ɵBaseResizer {
        const ResizerType = this.resizers
            .find((resizer) => resizer.id === id);

        return new ResizerType(context, this.injector);
    }
}
