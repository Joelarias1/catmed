// features/auth/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIconComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';

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

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

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