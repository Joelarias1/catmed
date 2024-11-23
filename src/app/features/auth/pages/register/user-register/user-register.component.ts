import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
  selector: 'app-user-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-register.component.html'
})
export class UserRegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  formSubmitted = false;
  isLoading = false;
  isSuccess = false;

  edadMascota = [
    { value: '', label: 'Selecciona la edad' },
    { value: '0', label: 'Menos de 1 año' },
    { value: '1', label: '1-3 años' },
    { value: '4', label: '4-7 años' },
    { value: '8', label: '8-12 años' },
    { value: '12', label: 'Más de 12 años' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), this.nameValidator()]],
      apellidos: ['', [Validators.required, Validators.minLength(3), this.nameValidator()]],
      email: ['', [Validators.required, this.emailValidator()]],
      telefono: ['', [Validators.required, this.phoneValidator()]],
      mascota: this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        edad: ['', [Validators.required, this.ageValidator()]],
        foto: [''],
        notas: ['', Validators.maxLength(500)]
      }),
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.passwordValidator()
      ]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    });

    const password = this.registerForm.get('password');
    const confirmPassword = this.registerForm.get('confirmPassword');

    if (password && confirmPassword) {
      merge(
        password.valueChanges,
        confirmPassword.valueChanges
      ).subscribe(() => {
        if (confirmPassword.value) {
          const match = password.value === confirmPassword.value;
          confirmPassword.setErrors(
            match ? null : { ...confirmPassword.errors, mismatch: true }
          );
        }
      });
    }
  }

  private nameValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;

      const isValid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value);
      return isValid ? null : { invalidName: true };
    };
  }

  private emailValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;

      const isValid = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo|hotmail)\.(com|es|cl)$/.test(value);
      return isValid ? null : { invalidEmail: true };
    };
  }

  private phoneValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;

      const isValid = /^\+?56\s?9\s?\d{4}\s?\d{4}$/.test(value);
      return isValid ? null : { invalidPhone: true };
    };
  }

  private ageValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;
      
      const validValues = this.edadMascota
        .filter(edad => edad.value !== '') 
        .map(edad => edad.value);
        
      return validValues.includes(value) ? null : { invalidAge: true };
    };
  }
  private passwordValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasNoSpaces = !/\s/.test(value);

      const requirements = {
        upperCase: hasUpperCase,
        lowerCase: hasLowerCase,
        number: hasNumber,
        specialChar: hasSpecialChar,
        noSpaces: hasNoSpaces
      };

      return (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasNoSpaces) 
        ? null 
        : { passwordRequirements: requirements };
    };
  }

  showValidationErrors() {
    if (!this.formSubmitted) {
      return [];
    }

    const controls = this.registerForm.controls;
    let errorMessages: string[] = [];

    Object.keys(controls).forEach(key => {
      const control = controls[key];
      if (control.errors) {
        switch(key) {
          case 'nombre':
          case 'apellidos':
            if (control.errors['required']) errorMessages.push(`El campo ${key} es requerido`);
            if (control.errors['minlength']) errorMessages.push(`${key} debe tener al menos 3 caracteres`);
            if (control.errors['invalidName']) errorMessages.push(`${key} solo puede contener letras y espacios`);
            break;
          case 'email':
            if (control.errors['required']) errorMessages.push('El email es requerido');
            if (control.errors['invalidEmail']) errorMessages.push('Email inválido (debe ser gmail, outlook, yahoo o hotmail)');
            break;
          case 'password':
            if (control.errors['passwordRequirements']) {
              const reqs = control.errors['passwordRequirements'];
              if (!reqs.upperCase) errorMessages.push('La contraseña debe contener al menos una mayúscula');
              if (!reqs.lowerCase) errorMessages.push('La contraseña debe contener al menos una minúscula');
              if (!reqs.number) errorMessages.push('La contraseña debe contener al menos un número');
              if (!reqs.specialChar) errorMessages.push('La contraseña debe contener al menos un símbolo');
              if (!reqs.noSpaces) errorMessages.push('La contraseña no puede contener espacios');
            }
            break;
        }
      }
    });

    return errorMessages;
  }

  async onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      try {
        this.isLoading = true;
        // Simular registro
        await new Promise(resolve => setTimeout(resolve, 1500));
        this.isSuccess = true;
        
        // Usar el router de Angular
        setTimeout(() => {
          this.router.navigate(['/user/dashboard']);
        }, 1000);
        
      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;
    
    switch(controlName) {
      case 'nombre':
      case 'apellidos':
        if (errors['required']) return `El ${controlName} es requerido`;
        if (errors['minlength']) return `El ${controlName} debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        if (errors['invalidName']) return `El ${controlName} solo puede contener letras y espacios`;
        break;
        
      case 'email':
        if (errors['required']) return 'El email es requerido';
        if (errors['invalidEmail']) return 'Email inválido (debe ser gmail, outlook, yahoo o hotmail)';
        break;
        
      case 'edad':
        if (errors['required']) return 'La fecha de nacimiento es requerida';
        if (errors['minAge']) return 'Debes ser mayor de 13 años';
        if (errors['maxAge']) return 'La edad ingresada no es válida';
        if (errors['invalidDate']) return 'La fecha ingresada no es válida';
        break;
  
      case 'telefono':
        if (errors['required']) return 'El teléfono es requerido';
        if (errors['invalidPhone']) return 'Formato de teléfono inválido (+56 9 XXXX XXXX)';
        break;
  
      case 'mascota.nombre':
        if (errors['required']) return 'El nombre de la mascota es requerido';
        if (errors['minlength']) return 'El nombre debe tener al menos 2 caracteres';
        break;
  
      case 'mascota.edad':
        if (errors['required']) return 'La edad de la mascota es requerida';
        if (errors['invalidAge']) return 'Selecciona una edad válida para tu mascota';
        break;
  
      case 'mascota.notas':
        if (errors['maxlength']) return 'Las notas no pueden exceder los 500 caracteres';
        break;
  
      case 'password':
        if (errors['required']) return 'La contraseña es requerida';
        if (errors['minlength']) return 'La contraseña debe tener al menos 8 caracteres';
        if (errors['maxlength']) return 'La contraseña no puede tener más de 20 caracteres';
        if (errors['passwordRequirements']) {
          const reqs = errors['passwordRequirements'];
          if (!reqs.upperCase) return 'La contraseña debe contener al menos una mayúscula';
          if (!reqs.lowerCase) return 'La contraseña debe contener al menos una minúscula';
          if (!reqs.number) return 'La contraseña debe contener al menos un número';
          if (!reqs.specialChar) return 'La contraseña debe contener al menos un símbolo';
          if (!reqs.noSpaces) return 'La contraseña no puede contener espacios';
        }
        break;
  
      case 'confirmPassword':
        if (errors['required']) return 'La confirmación de contraseña es requerida';
        if (errors['mismatch']) return 'Las contraseñas no coinciden';
        break;
  
      case 'terms':
        if (errors['required'] || errors['requiredTrue']) return 'Debes aceptar los términos y condiciones';
        break;
    }
  
    // Si hay un error pero no está contemplado arriba
    if (errors['required']) return 'Este campo es requerido';
    
    return '';
  }

  hasError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    if (controlName === 'confirmPassword') {
      return control ? (control.errors?.['mismatch'] || control.errors?.['required']) && control.touched : false;
    }
    return control ? (control.invalid && control.touched) : false;
  }
}