import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OPERATION_ARRAY } from '../data';

@Injectable()
export class OutputService {
    public get data(): string {
        return this._data$.getValue();
    }

    public get data$(): Observable<string> {
        return this._data$.asObservable();
    }

    private readonly defaultData = '0';
    private _data$ = new BehaviorSubject<string>(this.defaultData);

    public update(data: string): void {
        this._data$.next(data);
    }

    public push(symbol: string): void {
        this._data$.next(this.data + symbol);
    }

    public getLastSymbol(): string {
        return this.data[this.data.length - 1];
    }

    public replaceLastSymbol(newSymbol: string): void {
        const newData = this.data.slice(0, -1) + newSymbol;

        this._data$.next(newData);
    }

    public deleteLastSymbol(): void {
        const dataWithoutLastSymbol = this.data.slice(0, -1);

        this._data$.next(dataWithoutLastSymbol);
    }

    public splitToBlocks(): string[] {
        const operationsRegExpString = OPERATION_ARRAY.join('|');

        return this.data.split(operationsRegExpString);
    }

    public clear(): void {
        this._data$.next(this.defaultData);
    }
}
