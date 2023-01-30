import { SectionEnum } from './section.enum';

export interface Section {
    readonly id: SectionEnum;
    readonly label: string;
    readonly isSelectedByDefault?: boolean;
}
