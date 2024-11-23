import { Routes } from '@angular/router';

// Landing o Index
import { LandingComponent } from './features/home/pages/landing/landing.component';

// Auth
import { LoginComponent } from './features/auth/pages/login/login.component';
import { PasswordRecoveryComponent } from './features/auth/pages/password-recovery/password-recovery.component';
import { UserRegisterComponent } from './features/auth/pages/register/user-register/user-register.component';
import { VetRegisterComponent } from './features/auth/pages/register/vet-register/vet-register.component';

// User Dashboard
import { HomeComponent } from './features/user-dashboard/pages/home/home.component';
import { UserLayoutComponent } from './features/user-dashboard/user-layout/user-layout.component';
import { AppointmentsComponent } from './features/user-dashboard/pages/appointments/appointments.component';
import { PetsComponent } from './features/user-dashboard/pages/pets/pets.component';
import { ProfileComponent } from './features/user-dashboard/pages/profile/profile.component';

export const routes: Routes = [
  // Rutas públicas con navbar principal
  {
    path: '',
    data: { navbar: 'public' },
    children: [
      {
        path: '',
        component: LandingComponent,
        title: 'Bienvenido a CatMed',
      },
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
      {
        path: 'registeruser',
        component: UserRegisterComponent,
        title: 'Registrarme como Dueño/a',
      },
      {
        path: 'registervet',
        component: VetRegisterComponent,
        title: 'Registrarme como Veterinario',
      },
    ]
  },

  // Rutas de usuario con navbar de usuario
  {
    path: 'user',
    component: UserLayoutComponent,
    data: { navbar: 'user' },
    children: [
      {
        path: 'dashboard',
        component: HomeComponent,
        title: 'Panel de Usuario',
      },
      {
        path: 'appointments',
        component: AppointmentsComponent,
        title: 'Mis Citas',
      },
      {
        path: 'pets',
        component: PetsComponent,
        title: 'Mi Gato',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Mi Perfil',
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Redirección
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
