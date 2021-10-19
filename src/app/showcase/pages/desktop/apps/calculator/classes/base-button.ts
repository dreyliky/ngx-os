import { Injector } from '@angular/core';
import { ButtonGroupEnum } from '../enums';
import { OutputService } from '../services';

export abstract class BaseButton {
    public readonly group: ButtonGroupEnum;

    protected output: OutputService;

    public abstract label: string;

    constructor(
        protected readonly injector: Injector
    ) {
        this.output = this.injector.get(OutputService);
    }

    public abstract onClick(): void;
}
