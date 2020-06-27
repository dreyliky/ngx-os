import { OsResizableDirective } from '../directives';

export abstract class Resizer {

    constructor (
        protected readonly context: OsResizableDirective
    ) {}

    public abstract resizeElement (event: MouseEvent): void;

}
