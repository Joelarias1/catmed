import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-password-recovery',
  imports: [ CommonModule, ReactiveFormsModule, RouterLink, NgIconComponent],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})


export class PasswordRecoveryComponent {
  recoveryForm: FormGroup;
  isLoading = false;
  isEmailSent = false;

  constructor(private fb: FormBuilder) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.recoveryForm.get('email');
  }

  onSubmit(): void {
    if (this.recoveryForm.valid) {
      this.isLoading = true;
      // Simular envío (aquí irá tu lógica real)
      setTimeout(() => {
        this.isLoading = false;
        this.isEmailSent = true;
      }, 1500);
    }
  }
}