import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarUserComponent } from './navbar-user.component';
import { setupTestModule } from '@app/utils/test-utils';
import { provideHttpClient } from '@angular/common/http';

describe('🎯 NavbarUser Component', () => {
  let component: NavbarUserComponent;
  let fixture: ComponentFixture<NavbarUserComponent>;

  beforeEach(async () => {
    await setupTestModule(NavbarUserComponent, [], [provideHttpClient()]);

    fixture = TestBed.createComponent(NavbarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('✅ should create', () => {
    expect(component).toBeTruthy();
  });

  it('✅ should toggle menu', () => {
    expect(component.isMenuOpen).toBeFalse();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

});
