import { TreeNode } from 'ngx-os';
import { SectionEnum } from './section.enum';

export const SECTIONS: TreeNode[] = [
    {
        label: 'Desktop',
        data: {
            id: SectionEnum.Desktop
        }
    },
    {
        label: 'Documents',
        data: {
            id: SectionEnum.Documents
        }
    },
    {
        label: 'Pictures',
        data: {
            id: SectionEnum.Pictures
        }
    }
];
