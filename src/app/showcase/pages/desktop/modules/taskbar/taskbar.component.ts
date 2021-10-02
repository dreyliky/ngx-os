import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import { ButtonComponent, DynamicWindowRef, DynamicWindowService } from 'ngx-os/modules';
import { Observable } from 'rxjs';
import { TaskbarService } from './taskbar.service';

@Component({
    selector: 'desktop-taskbar',
    templateUrl: './taskbar.component.html',
    styleUrls: [
        './taskbar-win98.component.scss',
        './taskbar-winXP.component.scss',
        './taskbar-win10.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TaskbarService
    ]
})
export class TaskbarComponent implements OnInit, AfterViewInit {
    public windowRefs$: Observable<DynamicWindowRef[]>;

    @ViewChildren(ButtonComponent, { read: ElementRef })
    protected set windowRefElements(data: QueryList<ElementRef<HTMLElement>>) {
        this.taskbarService.setWindowRefElements(data);
    }

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly taskbarService: TaskbarService
    ) {}

    public ngOnInit(): void {
        this.windowRefs$ = this.dynamicWindowService.references$;
    }

    public ngAfterViewInit(): void {
        this.taskbarService.init(this.hostElementRef.nativeElement);
    }

    public getTaskbarIconCssUrl(iconUrl: string): string {
        return `url(${iconUrl || '/assets/showcase/icons/icon.png'})`;
    }

    public onWindowReferenceIconClick(event: PointerEvent, windowRef: DynamicWindowRef): void {
        if (!windowRef.isHidden && !windowRef.isActive) {
            windowRef.setIsActive(true);
        } else {
            windowRef.toggleVisibility();
        }

        // Disable outside click checking for window (which removes active state)
        event.stopPropagation();
    }
}
