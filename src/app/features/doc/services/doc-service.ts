import { Injectable } from "@angular/core";
import { first } from "rxjs/operators";
import { Doc, DocComponent } from "../interfaces";
import { DocStateService } from "./doc-state.service";

@Injectable({
    providedIn: 'root'
})
export class DocService {

    private doc: Doc;

    constructor(
        private readonly docStateService: DocStateService
    ) {
        this.updateDocData();
    }

    public getDocComponentsByNames(componentNames: string[]): DocComponent[] {
        return this.doc.components.filter((component) => {
            return componentNames.includes(component.name);
        });
    }

    private updateDocData(): void {
        this.docStateService.doc$
            .pipe(
                first()
            )
            .subscribe((doc) => this.doc = doc);
    }

}
