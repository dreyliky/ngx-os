import {
    ChangeDetectionStrategy,
    Component,
    OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { BackgroundMetadata, BackgroundService } from '../../../../features/background';
import { BackgroundControlService } from './services';

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
    public currentBackground$: Observable<BackgroundMetadata>;

    constructor(
        private readonly backgroundService: BackgroundService
    ) {}

    public ngOnInit(): void {
        this.currentBackground$ = this.backgroundService.data$;
    }
}
