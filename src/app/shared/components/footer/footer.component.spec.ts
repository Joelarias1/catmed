import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestModule } from '@utils/test-utils';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await setupTestModule(FooterComponent);
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('✅ should create', () => {
    expect(component).toBeTruthy();
  });
});
