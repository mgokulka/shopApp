import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Material from '@primeuix/themes/material';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { environment } from '../../environment';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase, 'DEFAULT')),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://127.0.0.1:9099/', {
          disableWarnings: true,
        });
      }
      return auth;
    }),

    provideFirestore(() => getFirestore()),

    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),

    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          darkMode: false, // <<<< Check this line!
        },
      },
    }),
  ],
};
