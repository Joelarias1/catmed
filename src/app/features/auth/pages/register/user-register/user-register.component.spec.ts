import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterComponent } from './user-register.component';
import { setupTestModule } from '@app/utils/test-utils';

describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;

  beforeEach(async () => {
    await setupTestModule(UserRegisterComponent);
    fixture = TestBed.createComponent(UserRegisterComponent);

    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
