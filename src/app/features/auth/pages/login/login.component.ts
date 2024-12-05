// features/auth/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { UserService } from '../../../../core/services/user.service';

/**
 * @description Componente de login que maneja la autenticación demo del usuario
 * @usageNotes
 * ```typescript
 * <app-login></app-login>
 * ```
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIconComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';

  /**
   * @description Inicializa el formulario de login y configura las validaciones
   * @param fb FormBuilder para crear el formulario reactivo
   * @param router Router para la navegación post-login
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    // Redirigir si ya está logueado
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/user/dashboard']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  /**
   * @description Getter para el campo email del formulario
   * @returns AbstractControl del campo email
   */
  get email() { return this.loginForm.get('email'); }

  /**
   * @description Getter para el campo password del formulario
   * @returns AbstractControl del campo password
   */
  get password() { return this.loginForm.get('password'); }

  /**
   * @description Alterna la visibilidad de la contraseña
   * @returns void
   */
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  /**
   * @description Maneja el envío del formulario de login
   * @returns void
   * @usageNotes
   * El método valida las credenciales demo:
   * - Email: test@catmed.com
   * - Password: Catmed123123!
   * Si son correctas, redirige a /user/dashboard
   * Si son incorrectas, muestra un mensaje de error
   */
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;
      
      this.userService.login(email, password).subscribe({
        next: (user) => {
          this.isLoading = false;
          if (user.role === 'user') {
            this.router.navigate(['/user/dashboard']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error;
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control) control.markAsTouched();
      });
    }
  }
}