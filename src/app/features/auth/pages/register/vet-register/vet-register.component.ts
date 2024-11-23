import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { merge } from 'rxjs';

interface ValidationMessage {
  [key: string]: string;
}

@Component({
  selector: 'app-vet-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './vet-register.component.html',
})
export class VetRegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  isSuccess = false;

  readonly especialidades = [
    { value: 'general', label: 'Medicina General Felina' },
    { value: 'cirugia', label: 'Cirugía Felina' },
    { value: 'dermatologia', label: 'Dermatología Felina' },
    { value: 'comportamiento', label: 'Comportamiento Felino' },
    { value: 'nutricion', label: 'Nutrición Felina' },
    { value: 'dental', label: 'Odontología Felina' },
  ];

  private readonly validationPatterns = {
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    email: /^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo|hotmail)\.(com|es|cl)$/,
    phone: /^\+?56\s?9\s?\d{4}\s?\d{4}$/,
    license: /^\d{1,8}$/,
    postalCode: /^\d+$/,
  };

  private readonly validationMessages: { [key: string]: ValidationMessage } = {
    nombre: {
      required: 'El campo nombre es requerido',
      minlength: 'Mínimo 3 caracteres',
      invalidName: 'Solo se permiten letras y espacios',
    },
    apellidos: {
      required: 'El campo apellidos es requerido',
      minlength: 'Mínimo 3 caracteres',
      invalidName: 'Solo se permiten letras y espacios',
    },
    email: {
      required: 'El email es requerido',
      invalidEmail: 'Email inválido (debe ser gmail, outlook, yahoo o hotmail)',
    },
    telefono: {
      required: 'El teléfono es requerido',
      invalidPhone: 'Formato de teléfono inválido (+56 9 XXXX XXXX)',
    },
    licencia: {
      required: 'El número de licencia es requerido',
      invalidLicense:
        'La licencia debe contener solo números (máximo 8 dígitos)',
    },
    especialidad: {
      required: 'Debe seleccionar una especialidad',
    },
    experiencia: {
      required: 'Los años de experiencia son requeridos',
      min: 'La experiencia no puede ser negativa',
      max: 'La experiencia no puede ser mayor a 50 años',
    },
    descripcion: {
      required: 'La descripción profesional es requerida',
      minlength: 'La descripción debe tener al menos 50 caracteres',
      maxlength: 'La descripción no puede exceder 500 caracteres',
    },
    ciudad: {
      required: 'La ciudad es requerida',
      minlength: 'El nombre de la ciudad debe tener al menos 3 caracteres',
      invalidCity: 'Solo se permiten letras y espacios',
    },
    codigo_postal: {
      invalidPostalCode: 'El código postal debe contener solo números',
    },
    password: {
      required: 'La contraseña es requerida',
      minlength: 'La contraseña debe tener al menos 8 caracteres',
      maxlength: 'La contraseña no puede tener más de 20 caracteres',
      upperCase: 'Debe contener al menos una mayúscula',
      lowerCase: 'Debe contener al menos una minúscula',
      number: 'Debe contener al menos un número',
      specialChar: 'Debe contener al menos un símbolo',
      noSpaces: 'No puede contener espacios',
    },
    confirmPassword: {
      required: 'La confirmación de contraseña es requerida',
      mismatch: 'Las contraseñas no coinciden',
    },
    terms: {
      required: 'Debes aceptar los términos y condiciones',
    },
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.initForm();
  }

  ngOnInit(): void {
    this.setupPasswordValidation();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          this.patternValidator('name', 'invalidName'),
        ],
      ],
      apellidos: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          this.patternValidator('name', 'invalidName'),
        ],
      ],
      email: [
        '',
        [Validators.required, this.patternValidator('email', 'invalidEmail')],
      ],
      telefono: [
        '',
        [Validators.required, this.patternValidator('phone', 'invalidPhone')],
      ],
      licencia: [
        '',
        [
          Validators.required,
          this.patternValidator('license', 'invalidLicense'),
        ],
      ],
      especialidad: ['', [Validators.required]],
      experiencia: [
        '',
        [Validators.required, Validators.min(0), Validators.max(50)],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(500),
        ],
      ],
      ciudad: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          this.patternValidator('name', 'invalidCity'),
        ],
      ],
      codigo_postal: [
        '',
        [this.patternValidator('postalCode', 'invalidPostalCode')],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          this.passwordValidator(),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]],
    });
  }

  private setupPasswordValidation(): void {
    const password = this.registerForm.get('password');
    const confirmPassword = this.registerForm.get('confirmPassword');

    if (password && confirmPassword) {
      merge(password.valueChanges, confirmPassword.valueChanges).subscribe(
        () => {
          if (confirmPassword.value) {
            const match = password.value === confirmPassword.value;
            confirmPassword.setErrors(match ? null : { mismatch: true });
          }
        }
      );
    }
  }

  private patternValidator(
    patternKey: keyof typeof this.validationPatterns,
    errorKey: string
  ) {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;
      return this.validationPatterns[patternKey].test(value)
        ? null
        : { [errorKey]: true };
    };
  }

  private passwordValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;

      const errors: { [key: string]: boolean } = {};

      if (!/[A-Z]/.test(value)) errors['upperCase'] = true;
      if (!/[a-z]/.test(value)) errors['lowerCase'] = true;
      if (!/[0-9]/.test(value)) errors['number'] = true;
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) errors['specialChar'] = true;
      if (/\s/.test(value)) errors['noSpaces'] = true;

      return Object.keys(errors).length ? errors : null;
    };
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (!control?.errors || !control.touched) return '';

    const fieldErrors = this.validationMessages[controlName];
    if (!fieldErrors) return '';

    // Para errores de contraseña, mostrar todos los errores relevantes
    if (controlName === 'password' && control.errors) {
      return Object.keys(control.errors)
        .map((errorKey) => fieldErrors[errorKey])
        .filter((message) => message)
        .join('. ');
    }

    // Para otros campos, mostrar el primer error
    const firstErrorKey = Object.keys(control.errors)[0];
    return fieldErrors[firstErrorKey] || '';
  }

  hasError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    if (!control) return false;
    return control.invalid && control.touched;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      try {
        this.isLoading = true;
        // Simular registro
        await new Promise((resolve) => setTimeout(resolve, 1500));
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/vet/dashboard']);
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

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
