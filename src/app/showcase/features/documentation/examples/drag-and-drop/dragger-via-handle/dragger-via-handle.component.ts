import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import { DraggerConfig } from 'ngx-os';

@Component({
    selector: 'showcase-dragger-via-handle',
    templateUrl: './dragger-via-handle.component.html',
    styleUrls: ['./dragger-via-handle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggerViaHandleComponent implements AfterViewInit {
    public draggerConfig: DraggerConfig;

    @ViewChild('container')
    private readonly containerElement: ElementRef<HTMLDivElement>;

    @ViewChild('handle')
    private readonly handleElement: ElementRef<HTMLDivElement>;

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngAfterViewInit(): void {
        this.draggerConfig = {
            draggableElement: this.handleElement.nativeElement,
            movableElement: this.containerElement.nativeElement
        };

        this.changeDetector.detectChanges();
    }
}
