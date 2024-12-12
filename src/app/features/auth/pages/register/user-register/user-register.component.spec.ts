import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRegisterComponent } from './user-register.component';
import { setupTestModule } from '@app/utils/test-utils';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;

  beforeEach(async () => {
    await setupTestModule(
      UserRegisterComponent,
      [ReactiveFormsModule],
      [provideHttpClient()]
    );

    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.registerForm).toBeTruthy();
    expect(component.registerForm.get('nombre')).toBeTruthy();
    expect(component.registerForm.get('email')).toBeTruthy();
  });
});
