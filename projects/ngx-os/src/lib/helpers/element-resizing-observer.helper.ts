import { Observable } from 'rxjs';

export function elementResizingObserver(element: HTMLElement): Observable<HTMLElement> {
    return new Observable((subscriber) => {
        const resizeObserver = new ResizeObserver(() => subscriber.next(element));

        resizeObserver.observe(element);

        return function unsubscribe() {
            resizeObserver.unobserve(element);
        };
    });
}
