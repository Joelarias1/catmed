import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { setupTestModule } from '@utils/test-utils';
import { provideHttpClient } from '@angular/common/http';

describe('✨ Login Component Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await setupTestModule(
      LoginComponent, 
      [ReactiveFormsModule],
      [provideHttpClient()]
    );

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

});
