import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    public get<T>(key: string): T {
        const data = localStorage.getItem(key);

        return (data) ? JSON.parse(data) : null;
    }

    public set(key: string, data: any): void {
        const value = JSON.stringify(data);

        localStorage.setItem(key, value);
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }
}
