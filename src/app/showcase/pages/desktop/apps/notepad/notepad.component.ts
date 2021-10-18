import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'notepad-app',
    templateUrl: './notepad.component.html',
    styleUrls: ['./notepad.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotepadAppComponent implements AfterViewInit {
    @ViewChild('editor', { static: true })
    private readonly editorElementRef: ElementRef<HTMLDivElement>;

    public ngAfterViewInit(): void {
        this.editorElementRef.nativeElement.focus();
    }
}
