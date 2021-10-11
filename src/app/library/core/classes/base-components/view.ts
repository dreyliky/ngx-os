import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    template: ''
})
export abstract class OsBaseViewComponent implements AfterViewInit, OnDestroy {
    protected isViewInit: boolean = false;
    protected viewDestroyed$ = new Subject();

    public ngAfterViewInit(): void {
        this.isViewInit = true;
    }

    public ngOnDestroy(): void {
        this.viewDestroyed$.next();
        this.viewDestroyed$.complete();
    }
}
