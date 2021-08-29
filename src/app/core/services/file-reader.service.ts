import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileReaderService {
    public readAsBase64(file: File, callback: (data: string) => any): void {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            callback(reader.result as string);
        };
    }
}
