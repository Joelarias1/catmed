import { Routes } from '@angular/router';

// Landing o Index
import { LandingComponent } from './features/home/pages/landing/landing.component';

// Auth
import { LoginComponent } from './features/auth/pages/login/login.component';

// Password Recovery
import { PasswordRecoveryComponent } from './features/auth/pages/password-recovery/password-recovery.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'Inicio'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
