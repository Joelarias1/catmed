import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { setupTestModule } from '@app/utils/test-utils';

describe('🎯 Navbar Component', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await setupTestModule(NavbarComponent);
    fixture = TestBed.createComponent(NavbarComponent);
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
