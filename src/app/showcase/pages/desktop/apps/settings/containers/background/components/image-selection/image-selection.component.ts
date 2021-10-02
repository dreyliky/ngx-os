import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    ViewChild
} from '@angular/core';
import { FileReaderService } from '@core/services';
import {
    BackgroundMetadata,
    BackgroundTypeEnum,
    BACKGROUND_URLS
} from '../../../../../../features/background';
import { BackgroundControlService } from '../../services';

@Component({
    selector: 'background-image-selection',
    templateUrl: './image-selection.component.html',
    styleUrls: ['./image-selection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageSelectionComponent {
    @Input()
    public readonly currentBackground: BackgroundMetadata;

    @ViewChild('fileUploader')
    private readonly fileUploaderRef: ElementRef<HTMLInputElement>;

    public readonly defaultBackgroundUrls = BACKGROUND_URLS;

    public get isCurrentBackgroundImage(): boolean {
        return (this.currentBackground.type === BackgroundTypeEnum.Image);
    }

    public get isCurrentBackgroundCustomImage(): boolean {
        return (this.currentBackground.type === BackgroundTypeEnum.CustomImage);
    }

    constructor(
        private readonly backgroundControlService: BackgroundControlService,
        private readonly fileReaderService: FileReaderService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public onUploadButtonClick(): void {
        this.fileUploaderRef.nativeElement.click();
    }

    public onBackgroundImageClick(imageUrl: string): void {
        this.backgroundControlService.applyImage(imageUrl);
    }

    public onCustomBackgroundUploaded(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        const file = inputElement.files[0];

        this.fileReaderService.readAsBase64(file, (imageBase64) => {
            inputElement.value = '';

            this.backgroundControlService.applyCustom(imageBase64);
            this.changeDetector.detectChanges();
        });
    }

    public getCustomBackgroundCssUrl(): string {
        if (this.isCurrentBackgroundCustomImage) {
            return this.getCssUrl(this.currentBackground.data);
        }

        return null;
    }

    public getCssUrl(imageUrl: string): string {
        return `url(${imageUrl})`;
    }

    public getIsImageSelected(imageUrl: string): boolean {
        return (
            this.isCurrentBackgroundImage &&
            (this.currentBackground.data === imageUrl)
        );
    }
}
