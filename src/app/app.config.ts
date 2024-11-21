import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// Iconos
import { provideIcons } from '@ng-icons/core';
import { 
  bootstrapTwitterX,
  bootstrapInstagram,
  bootstrapFacebook,
  bootstrapEyeSlashFill,
  bootstrapEyeSlash,
  bootstrapCheckCircle,
  bootstrapPersonBadge,

} from '@ng-icons/bootstrap-icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideIcons({ 
      bootstrapInstagram, 
      bootstrapTwitterX, 
      bootstrapFacebook,
      bootstrapEyeSlashFill,
      bootstrapEyeSlash,
      bootstrapCheckCircle,
      bootstrapPersonBadge,
  
    })
  ]
};
