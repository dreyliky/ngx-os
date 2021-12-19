import { Observable } from 'rxjs';

/** @internal */
export function ɵElementResizingObserver(element: HTMLElement): Observable<HTMLElement> {
    return new Observable((subscriber) => {
        const resizeObserver = new ResizeObserver(() => subscriber.next(element));

        resizeObserver.observe(element);

        return function unsubscribe() {
            resizeObserver.unobserve(element);
        };
    });
}
