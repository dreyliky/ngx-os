import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ɵEventOutside } from 'ngx-os';
import { fromEvent } from 'rxjs';
import { filter, first } from 'rxjs/operators';

abstract class File {
    public name: string;
    public iconUrl: string;
    public isEditing?: boolean;
    public readonly abstract type: 'png' | 'exe';

    constructor(params: Partial<File>) {
        Object.assign(this, params);
    }

    public getLabel(): string {
        return `${this.name}.${this.type}`;
    }
}

class FilePng extends File {
    public readonly type = 'png';
}

class FileExe extends File {
    public readonly type = 'exe';
}

@Component({
    selector: 'showcase-grid-item-customization',
    templateUrl: './grid-item-customization.component.html',
    styleUrls: ['./grid-item-customization.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridItemCustomizationComponent {
    public readonly files: File[] = [
        new FilePng({
            name: 'My favorite background texture',
            iconUrl: '/assets/showcase/images/bg/1.png'
        }),
        new FileExe({
            name: 'Notepad',
            iconUrl: '/assets/showcase/icons/notepad.png'
        })
    ];

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public onFileClick(event: Event, file: File): void {
        const fileElement = event.target as HTMLElement;
        file.isEditing = true;

        this.initFileOutsideClickObserver(file, fileElement);
    }

    public getBackgroundCssUrl(url: string): string {
        return `url(${url})`;
    }

    private initFileOutsideClickObserver(file: File, labelZoneElement: HTMLElement): void {
        fromEvent(this.document, 'click')
            .pipe(
                filter((event) => ɵEventOutside.checkForElement(labelZoneElement, event)),
                first()
            )
            .subscribe(() => {
                file.isEditing = false;

                this.changeDetector.detectChanges();
            });
    }
}
