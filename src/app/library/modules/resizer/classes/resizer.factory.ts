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
    constructor(
        private readonly injector: Injector
    ) {}

    public create(id: ResizerEnum, context: ResizableDirective): ɵBaseResizer {
        const ResizerType = this.getResizerClassById(id);

        return new ResizerType(context, this.injector);
    }

    // eslint-disable-next-line max-lines-per-function
    private getResizerClassById(id: ResizerEnum): typeof ɵTopResizer {
        switch (id) {
            case ResizerEnum.TopLeft:
                return ɵTopLeftResizer;
            case ResizerEnum.Top:
                return ɵTopResizer;
            case ResizerEnum.TopRight:
                return ɵTopRightResizer;
            case ResizerEnum.Left:
                return ɵLeftResizer;
            case ResizerEnum.Right:
                return ɵRightResizer;
            case ResizerEnum.BottomLeft:
                return ɵBottomLeftResizer;
            case ResizerEnum.Bottom:
                return ɵBottomResizer;
            case ResizerEnum.BottomRight:
                return ɵBottomRightResizer;
            default:
                throw new Error(`Can't find resizer by id: ${id}`);
        }
    }
}
