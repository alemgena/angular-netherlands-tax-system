import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if(environment.version) {
  let versionColour = '41b833'
  if (environment.version.indexOf("-SNAPSHOT") !== -1) versionColour = 'ff0000'

  console.info(
    `%c ZTC-UI %c v${environment.version} %c`,
    'background:#222 ; padding: 1px; border-radius: 3px 0px 0px 3px;  color: #fff ; font-weight:600',
    `background:#${versionColour} ; padding: 1px; border-radius: 0px 3px 3px 0px;  color: #fff`,
    'background:transparent'
  )
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
