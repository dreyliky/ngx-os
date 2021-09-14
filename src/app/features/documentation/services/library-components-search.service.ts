import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentMetaInfoMap } from '../data';
import { ComponentMetaInfo } from '../interfaces';

@Injectable()
export class LibraryComponentsSearchService {
    public filteredComponents$: Observable<ComponentMetaInfo[]>;

    private searchString$ = new BehaviorSubject<string>('');

    constructor() {
        this.initComponentsObservable();
    }

    public search(searchString: string): void {
        this.searchString$.next(searchString);
    }

    private initComponentsObservable(): void {
        this.filteredComponents$ = this.searchString$
            .pipe(
                map(() => this.filterMetaInfosBySearchString())
            );
    }

    private filterMetaInfosBySearchString(): ComponentMetaInfo[] {
        const components = [...ComponentMetaInfoMap.values()];
        const searchString = this.searchString$
            .getValue()
            .trim()
            .toLowerCase();

        return components
            .filter((metaInfo) => (
                !searchString.length ||
                metaInfo.name.toLowerCase().includes(searchString)
            ));
    }
}
