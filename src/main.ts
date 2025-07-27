import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { routes } from './app/app.routes';
console.log('ROUTES:', routes);

bootstrapApplication(App, appConfig)
  .then(() => console.log('App bootstrapped!'))
  .catch((err) => console.error(err));
