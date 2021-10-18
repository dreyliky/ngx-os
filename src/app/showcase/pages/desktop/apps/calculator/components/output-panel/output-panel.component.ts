import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OutputService } from '../../services';

@Component({
    selector: 'calculator-output-panel',
    templateUrl: './output-panel.component.html',
    styleUrls: ['./output-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutputPanelComponent implements OnInit {
    public output$: Observable<string>;

    constructor(
        private readonly outputService: OutputService
    ) {}

    public ngOnInit(): void {
        this.output$ = this.outputService.data$;
    }
}
