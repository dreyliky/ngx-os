import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExecService } from '../../../../features/exec';
import { NOTEPAD_APP } from '../../../notepad';
import { Poem } from './poem.interface';
import { PoemsService } from './poems.service';

@Component({
    selector: 'file-explorer-documents-section',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        PoemsService
    ]
})
export class DocumentsComponent implements OnInit {
    public poems$: Observable<Poem[]>;

    constructor(
        private readonly poemsService: PoemsService,
        private readonly execService: ExecService
    ) {}

    public ngOnInit(): void {
        this.poems$ = this.poemsService.load();
    }

    public onPoemDblClick(poem: Poem): void {
        this.execService.run(NOTEPAD_APP, poem.content);
    }
}
