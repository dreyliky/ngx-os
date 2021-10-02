import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ShowcaseModule } from './app/showcase/showcase.module';
import { environment } from './environments/environment';


if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(ShowcaseModule)
    .catch((err) => console.error(err));
