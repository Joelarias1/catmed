// features/auth/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

/**
 * @description Componente de login que maneja la autenticación demo del usuario
 * @usageNotes
 * ```typescript
 * <app-login></app-login>
 * ```
 * Credenciales de demo:
 * - Email: test@catmed.com
 * - Password: Catmed123123!
 */
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIconComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
    private router: Router
  ) {
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
      
      setTimeout(() => {
        if (email === 'test@catmed.com' && password === 'Catmed123123!') {
          this.router.navigate(['/user/dashboard']);
        } else {
          this.errorMessage = 'Credenciales incorrectas';
          this.isLoading = false;
        }
      }, 1000);
    }
  }
}