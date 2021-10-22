import { SectionEnum } from './section.enum';
import { Section } from './section.interface';

export const SECTIONS: Section[] = [
    {
        id: SectionEnum.Theme,
        name: 'Theme'
    },
    {
        id: SectionEnum.Shortcuts,
        name: 'Shortcuts'
    },
    {
        id: SectionEnum.Taskbar,
        name: 'Taskbar'
    },
    {
        id: SectionEnum.AccentColor,
        name: 'Accent Color'
    },
    {
        id: SectionEnum.Background,
        name: 'Background'
    }
];
