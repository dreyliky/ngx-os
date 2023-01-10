import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuBarButtonComponent } from '../components';

/** @internal */
@Injectable()
export class ɵMenuBarActiveButtonState {
    public get data$(): Observable<MenuBarButtonComponent | null> {
        return this._data$.asObservable();
    }

    public get data(): MenuBarButtonComponent | null {
        return this._data$.getValue();
    }

    private readonly _data$ = new BehaviorSubject<MenuBarButtonComponent | null>(null);

    public set(button: MenuBarButtonComponent): void {
        this._data$.next(button);
    }

    public clear(): void {
        this._data$.next(null);
    }
}
