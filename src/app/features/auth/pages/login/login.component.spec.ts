import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapEyeSlash, bootstrapEyeSlashFill, bootstrapInfoCircle } from '@ng-icons/bootstrap-icons';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('✨ Login Component Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'user/dashboard', component: {} as any }
        ]),
        NgIconComponent
      ],
      providers: [
        provideIcons({ 
          bootstrapEyeSlash, 
          bootstrapEyeSlashFill,
          bootstrapInfoCircle 
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  describe('📝 Form Tests', () => {
    it('✅ should create component', () => {
      expect(component).toBeTruthy();
    });

    it('✅ should initialize form empty', () => {
      expect(component.loginForm.get('email')?.value).toBe('');
      expect(component.loginForm.get('password')?.value).toBe('');
      expect(component.loginForm.get('remember')?.value).toBeFalse();
    });

    it('✅ should be invalid when empty', () => {
      expect(component.loginForm.valid).toBeFalse();
    });
  });

  describe('🔒 Password Visibility Tests', () => {
    it('✅ should toggle password visibility', () => {
      expect(component.showPassword).toBeFalse();
      component.togglePassword();
      expect(component.showPassword).toBeTrue();
    });
  });

  describe('🚀 Submit Tests', () => {
    it('✅ should show error with wrong credentials', fakeAsync(() => {
      component.loginForm.patchValue({
        email: 'wrong@email.com',
        password: 'WrongPass123!'
      });
      
      component.onSubmit();
      tick(1000);
      fixture.detectChanges();
      
      expect(component.errorMessage).toBe('Credenciales incorrectas');
    }));

    it('✅ should accept correct demo credentials', fakeAsync(() => {
      component.loginForm.patchValue({
        email: 'test@catmed.com',
        password: 'Catmed123123!'
      });
      
      component.onSubmit();
      tick(1000);
      fixture.detectChanges();
      
      expect(component.errorMessage).toBe('');
    }));
  });
});
