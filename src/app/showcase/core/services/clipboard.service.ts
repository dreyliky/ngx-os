import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClipboardService {
    public read(): Observable<string> {
        return from(
            window.navigator.clipboard.readText()
        );
    }

    public write(data: string): Observable<void> {
        return from(
            window.navigator.clipboard.writeText(data)
        );
    }
}
