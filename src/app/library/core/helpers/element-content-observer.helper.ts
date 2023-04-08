import { Observable } from 'rxjs';

/** @internal */
export function ɵElementContentObserver(
    element: HTMLElement,
    options: MutationObserverInit
): Observable<MutationRecord[]> {
    return new Observable((subscriber) => {
        const mutationObserver = new MutationObserver((records) => subscriber.next(records));

        mutationObserver.observe(element, options);

        return function unsubscribe() {
            mutationObserver.disconnect();
        };
    });
}
