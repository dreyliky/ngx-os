import { Input, Output, EventEmitter, OnInit, Directive } from '@angular/core';
import { IdGenerator } from '../../helpers';

@Directive()
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
    public osClick: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osDblclick: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osMousedown: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osMousemove: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osMouseout: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osMouseover: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osMouseup: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osWheel: EventEmitter<MouseEvent> = new EventEmitter();

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
