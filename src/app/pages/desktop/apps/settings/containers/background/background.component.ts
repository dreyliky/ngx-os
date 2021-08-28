import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackgroundService } from '@Doc/pages/desktop/features/background';
import { BackgroundTypeEnum } from '@Doc/pages/desktop/features/background/enums';
import { BackgroundMetadata } from '@Doc/pages/desktop/features/background/interfaces';
import { ThemeRgbColor } from '@lib-modules';
import { BackgroundControlService } from './background-control.service';

@Component({
    selector: 'settings-background-section',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        BackgroundControlService
    ]
})
export class BackgroundComponent implements OnInit {
    @ViewChild('fileUploader')
    private readonly fileUploaderRef: ElementRef<HTMLInputElement>;

    public readonly backgroundImages: string[] = [
        '/assets/images/bg/1.png',
        '/assets/images/bg/2.png',
        '/assets/images/bg/3.png'
    ];

    public get isCurrentBackgroundImage(): boolean {
        return (this.currentBackground.type === BackgroundTypeEnum.Image);
    }

    public get isCurrentBackgroundCustomImage(): boolean {
        return (this.currentBackground.type === BackgroundTypeEnum.CustomImage);
    }

    public get isCurrentBackgroundColor(): boolean {
        return (this.currentBackground.type === BackgroundTypeEnum.Color);
    }

    public get selectedBackgroundColor(): ThemeRgbColor {
        if (this.isCurrentBackgroundColor) {
            return this.currentBackground.data as ThemeRgbColor;
        }

        return null;
    }

    public currentBackground: BackgroundMetadata;

    constructor(
        private readonly backgroundService: BackgroundService,
        private readonly backgroundControlService: BackgroundControlService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initBackgroundObserver();
    }

    public onUploadButtonClick(): void {
        this.fileUploaderRef.nativeElement.click();
    }

    public onBackgroundImageClick(imageUrl: string): void {
        this.backgroundControlService.applyImage(imageUrl);
    }

    public onCustomBackgroundUploaded(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        const file = inputElement.files[0];

        this.backgroundControlService.applyCustom(file, () => {
            inputElement.value = '';
            this.changeDetector.detectChanges();
        });
    }

    public onAccentColorClick(color: ThemeRgbColor): void {
        this.backgroundControlService.applyColor(color);
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

    private initBackgroundObserver(): void {
        this.backgroundService.data$
            .subscribe((currentBackground) => {
                this.currentBackground = currentBackground;

                this.changeDetector.detectChanges();
            });
    }
}
