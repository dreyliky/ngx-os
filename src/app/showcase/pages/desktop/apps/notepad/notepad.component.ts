import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    ViewChild
} from '@angular/core';
import { DynamicWindowRef, DYNAMIC_WINDOW_REF } from 'ngx-os';

@Component({
    selector: 'notepad-app',
    templateUrl: './notepad.component.html',
    styleUrls: ['./notepad.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotepadAppComponent implements AfterViewInit {
    @ViewChild('editor', { static: true })
    private readonly editorElementRef: ElementRef<HTMLDivElement>;

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: DynamicWindowRef
    ) {}

    public ngAfterViewInit(): void {
        this.initDefaultContent();
        this.editorElementRef.nativeElement.focus();
    }

    private initDefaultContent(): void {
        this.editorElementRef.nativeElement.innerHTML = this.windowRef.config.data ?? '';
    }
}
