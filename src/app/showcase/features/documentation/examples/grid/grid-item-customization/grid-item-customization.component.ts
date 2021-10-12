import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { EventOutside } from 'ngx-os';
import { fromEvent } from 'rxjs';
import { filter, first } from 'rxjs/operators';

enum FileTypeEnum {
    Png = 'png',
    Exe = 'exe'
}

interface PngData {
    imageUrl: string;
}

interface ExeData {
    iconUrl: string;
}

interface File<T = unknown> {
    name: string;
    type: FileTypeEnum;
    data: T;
    isEditing?: boolean;
    labelExpr: (file: File<T>) => string;
    iconUrlExpr: (file: File<T>) => string;
}

@Component({
    selector: 'showcase-grid-item-customization',
    templateUrl: './grid-item-customization.component.html',
    styleUrls: ['./grid-item-customization.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridItemCustomizationComponent {
    public readonly files: File<unknown>[] = [
        <File<PngData>>{
            name: 'My favorite background texture',
            type: FileTypeEnum.Png,
            data: { imageUrl: '/assets/showcase/images/bg/1.png' },

            iconUrlExpr: (file) => file.data.imageUrl,
            labelExpr: ({ name, type }) => `${name}.${type}`
        },
        <File<ExeData>>{
            name: 'Notepad',
            type: FileTypeEnum.Exe,
            data: { iconUrl: '/assets/showcase/icons/notepad.png' },
            iconUrlExpr: (file) => file.data.iconUrl,
            labelExpr: ({ name, type }) => `${name}.${type}`
        }
    ];

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public onFileClick(event: MouseEvent, file: File): void {
        const fileElement = event.target as HTMLElement;
        file.isEditing = true;

        this.initFileOutsideClickObserver(file, fileElement);
    }

    private initFileOutsideClickObserver(file: File, labelZoneElement: HTMLElement): void {
        fromEvent(document, 'click')
            .pipe(
                filter((event) => EventOutside.checkForElement(labelZoneElement, event)),
                first()
            )
            .subscribe(() => {
                file.isEditing = false;

                this.changeDetector.detectChanges();
            });
    }
}
