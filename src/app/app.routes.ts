import { Routes } from '@angular/router';

// Landing o Index
import { LandingComponent } from './features/home/pages/landing/landing.component';

// Auth
import { LoginComponent } from './features/auth/pages/login/login.component';
import { PasswordRecoveryComponent } from './features/auth/pages/password-recovery/password-recovery.component';
import { UserRegisterComponent } from './features/auth/pages/register/user-register/user-register.component';
import { VetRegisterComponent } from './features/auth/pages/register/vet-register/vet-register.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'Inicio',
  },

  //   AUTH & RECOVERY
  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar Sesión',
  },
  {
    path: 'recovery',
    component: PasswordRecoveryComponent,
    title: 'Recuperar Contraseña',
  },
  
  //   SECCION: USER
  {
    path: 'registeruser',
    component: UserRegisterComponent,
    title: 'Registrarme como Dueño/a',
  },
  
  
  // SECCION: VET
  {
    path: 'registervet',
    component: VetRegisterComponent,
    title: 'Registrarme como Veterinario',
  },
  







  //   REDIRECT
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
