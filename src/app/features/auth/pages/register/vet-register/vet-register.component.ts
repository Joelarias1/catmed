import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vet-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './vet-register.component.html'
})
export class VetRegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  formSubmitted = false;
  isLoading = false;
  isSuccess = false;

  especialidades = [
    { value: 'general', label: 'Medicina General Felina' },
    { value: 'cirugia', label: 'Cirugía Felina' },
    { value: 'dermatologia', label: 'Dermatología Felina' },
    { value: 'comportamiento', label: 'Comportamiento Felino' },
    { value: 'nutricion', label: 'Nutrición Felina' },
    { value: 'dental', label: 'Odontología Felina' }
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
      licencia: ['', [Validators.required, this.licenseValidator()]],
      especialidad: ['', [Validators.required]],
      experiencia: ['', [Validators.required, Validators.min(0), Validators.max(50)]],
      descripcion: ['', [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(500)
      ]],
      ciudad: ['', [Validators.required, Validators.minLength(3)]],
      codigo_postal: ['', [Validators.required, this.postalCodeValidator()]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.passwordValidator()
      ]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, {
      validators: [this.passwordMatchValidator]
    });
  }

  private licenseValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;

      const isValid = /^VET-\d{5}$/.test(value);
      return isValid ? null : { invalidLicense: true };
    };
  }

  private postalCodeValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;
      
      const isValid = /^\d{7}$/.test(value);
      return isValid ? null : { invalidPostalCode: true };
    };
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
      return (value >= 0 && value <= 30) ? null : { invalidAge: true };
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

  private passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (!password || !confirmPassword) return null;
    
    if (confirmPassword.value) {
      const match = password.value === confirmPassword.value;
      if (!match) {
        confirmPassword.setErrors({ ...confirmPassword.errors, mismatch: true });
      } else {
        const errors = confirmPassword.errors;
        if (errors) {
          delete errors['mismatch'];
          confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
        }
      }
    }
    
    return null;
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
          case 'confirmPassword':
            if (control.errors['required']) errorMessages.push('La confirmación de contraseña es requerida');
            if (control.errors['mismatch']) errorMessages.push('Las contraseñas no coinciden');
            break;
          case 'terms':
            if (control.errors['required']) errorMessages.push('Debes aceptar los términos y condiciones');
            break;
        }
      }
    });

    return errorMessages;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.isSuccess = true;
      
      // Simular llamada al backend
      setTimeout(() => {
        this.router.navigate(['/user/dashboard']);
      }, 2000);
    } else {
      const errors = this.showValidationErrors();
      console.log('Errores:', errors);
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
    
    if (!control || !control.errors) return '';

    const errors = control.errors;
    
    if (controlName === 'confirmPassword') {
      if (errors['required']) return 'La confirmación de contraseña es requerida';
      if (errors['mismatch']) return 'Las contraseñas no coinciden';
      return '';
    }

    if (controlName === 'terms') {
      if (!control.value) return 'Debes aceptar los términos y condiciones';
      return '';
    }

    if (controlName === 'nombre') {
      if (errors['required']) return 'El campo nombre es requerido';
      if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      if (errors['invalidName']) return 'Solo se permiten letras y espacios';
    }

    if (controlName === 'apellidos') {
      if (errors['required']) return 'El campo apellidos es requerido';
      if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      if (errors['invalidName']) return 'Solo se permiten letras y espacios';
    }

    if (controlName === 'email') {
      if (errors['required']) return 'El email es requerido';
      if (errors['invalidEmail']) return 'Email inválido (debe ser gmail, outlook, yahoo o hotmail)';
    }

    if (controlName === 'telefono') {
      if (errors['required']) return 'El teléfono es requerido';
      if (errors['invalidPhone']) return 'Formato de teléfono inválido (+56 9 XXXX XXXX)';
    }

    if (controlName === 'mascota') {
      if (errors['nombre']) return 'El nombre de la mascota es requerido';
      if (errors['edad']) return 'La edad de la mascota es requerida';
      if (errors['invalidAge']) return 'La edad de la mascota debe estar entre 0 y 30 años';
    }

    if (controlName === 'password') {
      if (errors['passwordRequirements']) {
        const reqs = errors['passwordRequirements'];
        if (!reqs.upperCase) return 'Debe contener al menos una mayúscula';
        if (!reqs.lowerCase) return 'Debe contener al menos una minúscula';
        if (!reqs.number) return 'Debe contener al menos un número';
        if (!reqs.specialChar) return 'Debe contener al menos un símbolo';
        if (!reqs.noSpaces) return 'No puede contener espacios';
      }
    }

    return '';
  }

  hasError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    if (controlName === 'confirmPassword') {
      return control ? (control.errors?.['mismatch'] || control.errors?.['required']) && control.touched : false;
    }
    if (controlName === 'terms') {
      return control ? !control.value && control.touched : false;
    }
    return control ? (control.invalid && control.touched) : false;
  }
}
