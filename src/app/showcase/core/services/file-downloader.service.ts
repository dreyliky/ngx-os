import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileDownloaderService {
    public download(file: Blob, fileName: string, fileType: string): void {
        const urlAddresponses = window.URL.createObjectURL(file);
        const a = document.createElement('a');

        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = urlAddresponses;
        a.download = `${fileName}.${fileType}`;
        a.click();
        window.URL.revokeObjectURL(urlAddresponses);
        a.remove();
    }
}
