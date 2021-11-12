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
    @ViewChild('container')
    private readonly containerElement: ElementRef<HTMLDivElement>;

    @ViewChild('handle')
    private readonly handleElement: ElementRef<HTMLDivElement>;

    public draggerConfig: DraggerConfig;

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
