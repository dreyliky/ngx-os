import { SectionEnum } from './section.enum';
import { Section } from './section.interface';

export const SECTIONS: Section[] = [
    {
        id: SectionEnum.Desktop,
        label: 'Desktop',
        isSelectedByDefault: true
    },
    {
        id: SectionEnum.Documents,
        label: 'Documents'
    },
    {
        id: SectionEnum.Pictures,
        label: 'Pictures'
    }
];
