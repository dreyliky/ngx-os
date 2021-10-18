import { Injector } from '@angular/core';
import { ButtonEnum, ButtonGroupEnum } from '../enums';
import { OutputService } from '../services';

export abstract class BaseButton {
    public static type: ButtonEnum;
    public static group: ButtonGroupEnum;

    protected output: OutputService;

    public abstract label: string;

    constructor(
        protected readonly injector: Injector
    ) {
        this.onInit();
    }

    public onInit(): void {
        this.output = this.injector.get(OutputService);
    }

    public abstract onClick(): void;
}
