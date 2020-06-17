import { Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IdGenerator } from '../../helpers';

export class OsBaseComponent implements OnInit {

    @Input()
    public style: any;

    @Input()
    public styleClass: string;

    @Input()
    public set id (value: string) {
        this._id = value;
    }

    public get id (): string {
        return this._id;
    }

    @Output()
    public OnClick: EventEmitter<MouseEvent> = new EventEmitter();

    protected _id: string;

    private readonly _elementName;

    constructor ({
        elementName = 'element'
    }) {
        this._elementName = elementName;
    }

    public ngOnInit (): void {
        if (!this._id) {
            this._id = IdGenerator.generate(this._elementName);
        }
    }

}
