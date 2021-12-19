import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * @internal
 * Service provides shared event listeners.
 * Better to move global event listeners here, instead of
 * using for example: fromEvent(document, 'click') in different places.
 *
 * In the case of using this service, you will have ONE listener, not many.
 **/
@Injectable({
    providedIn: 'root'
})
export class ɵGlobalEvents {
    private documentEventMap = new Map<string, Observable<Event>>();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document
    ) {}

    public fromDocument<T extends Event>(eventName: keyof DocumentEventMap): Observable<T> {
        if (!this.documentEventMap.has(eventName)) {
            const emitter = new Subject<Event>();

            this.document.addEventListener(eventName, (event) => emitter.next(event));
            this.documentEventMap.set(eventName, emitter.asObservable());
        }

        return this.documentEventMap.get(eventName) as Observable<T>;
    }
}
