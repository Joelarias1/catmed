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

/**
 * @description Componente para el registro de usuarios dueños de mascotas
 * @usageNotes
 * ```typescript
 * <app-user-register></app-user-register>
 * ```
 */
@Component({
  selector: 'app-user-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-register.component.html',
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  isSuccess = false;

  readonly edadMascota = [
    { value: '', label: 'Selecciona la edad' },
    { value: '0', label: 'Menos de 1 año' },
    { value: '1', label: '1-3 años' },
    { value: '4', label: '4-7 años' },
    { value: '8', label: '8-12 años' },
    { value: '12', label: 'Más de 12 años' }
  ];

  private readonly validationPatterns = {
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    email: /^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo|hotmail)\.(com|es|cl)$/,
    phone: /^\+?56\s?9\s?\d{4}\s?\d{4}$/,
  };

  private readonly validationMessages: { [key: string]: ValidationMessage } = {
    nombre: {
      required: 'El nombre es requerido',
      minlength: 'Mínimo 3 caracteres',
      invalidName: 'Solo se permiten letras y espacios',
    },
    apellidos: {
      required: 'Los apellidos son requeridos',
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
    'mascota.nombre': {
      required: 'El nombre de la mascota es requerido',
      minlength: 'El nombre debe tener al menos 2 caracteres',
    },
    'mascota.edad': {
      required: 'La edad de la mascota es requerida',
      invalidAge: 'Selecciona una edad válida para tu mascota',
    },
    'mascota.notas': {
      maxlength: 'Las notas no pueden exceder los 500 caracteres',
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

  /**
   * @description Inicializa el formulario con sus validaciones
   * @param fb FormBuilder para crear el formulario reactivo
   * @param router Router para la navegación post-registro
   */
  constructor(private fb: FormBuilder, private router: Router) {
    this.initForm();
  }

  /**
   * @description Inicializa las validaciones de contraseña
   * @returns void
   */
  ngOnInit(): void {
    this.setupPasswordValidation();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        this.patternValidator('name', 'invalidName')
      ]],
      apellidos: ['', [
        Validators.required,
        Validators.minLength(3),
        this.patternValidator('name', 'invalidName')
      ]],
      email: ['', [
        Validators.required,
        this.patternValidator('email', 'invalidEmail')
      ]],
      telefono: ['', [
        Validators.required,
        this.patternValidator('phone', 'invalidPhone')
      ]],
      mascota: this.fb.group({
        nombre: ['', [Validators.required]],
        edad: ['', [Validators.required]],
        foto: [''],
        notas: ['', [Validators.maxLength(500)]]
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

  /**
   * @description Valida patrones usando expresiones regulares
   * @param patternKey Clave del patrón a validar
   * @param errorKey Clave del error a retornar
   * @returns Función validadora para AbstractControl
   */
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

  /**
   * @description Valida requisitos de contraseña
   * @returns Función validadora para AbstractControl
   * @usageNotes Valida mayúsculas, minúsculas, números, caracteres especiales y espacios
   */
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

  /**
   * @description Obtiene el mensaje de error para un control específico
   * @param controlName Nombre del control del formulario
   * @returns Mensaje de error o cadena vacía
   */
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

  /**
   * @description Maneja el envío del formulario
   * @returns Promise<void>
   * @usageNotes Simula un registro y redirige a /user/dashboard en caso de éxito
   */
  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      try {
        this.isLoading = true;
        // Simular registro
        await new Promise((resolve) => setTimeout(resolve, 1500));
        this.isSuccess = true;
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

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}