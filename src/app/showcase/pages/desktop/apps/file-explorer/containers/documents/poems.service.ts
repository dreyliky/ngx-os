import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poem } from './poem.interface';

@Injectable()
export class PoemsService {
    constructor(
        private readonly http: HttpClient
    ) {}

    public load(): Observable<Poem[]> {
        return this.http.get<Poem[]>('https://www.poemist.com/api/v1/randompoems');
    }
}
