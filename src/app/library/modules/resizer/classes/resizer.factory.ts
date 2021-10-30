import { Injectable, Injector } from '@angular/core';
import { ResizableDirective } from '../directives';
import { ResizerEnum } from '../enums';
import { BaseResizer } from './base-resizer';
import { BottomLeftResizer } from './bottom-left-resizer';
import { BottomResizer } from './bottom-resizer';
import { BottomRightResizer } from './bottom-right-resizer';
import { LeftResizer } from './left-resizer';
import { RightResizer } from './right-resizer';
import { TopLeftResizer } from './top-left-resizer';
import { TopResizer } from './top-resizer';
import { TopRightResizer } from './top-right-resizer';

/** @internal */
@Injectable()
export class ResizerFactory {
    private readonly resizers = [
        TopLeftResizer,
        TopResizer,
        TopRightResizer,
        LeftResizer,
        RightResizer,
        BottomLeftResizer,
        BottomResizer,
        BottomRightResizer
    ];

    constructor(
        private readonly injector: Injector
    ) {}

    public create(id: ResizerEnum, context: ResizableDirective): BaseResizer {
        const ResizerType = this.resizers
            .find((resizer) => resizer.id === id);

        return new ResizerType(context, this.injector);
    }
}
