import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAngularQuery, QueryClient} from "@tanstack/angular-query-experimental";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAngularQuery(new QueryClient({
      defaultOptions: {
        queries: {

        }
      }
    })),
  ]
};
