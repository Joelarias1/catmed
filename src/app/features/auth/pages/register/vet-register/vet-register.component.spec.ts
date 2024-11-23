import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetRegisterComponent } from './vet-register.component';
import { setupTestModule } from '@app/utils/test-utils';

describe('VetRegisterComponent', () => {
  let component: VetRegisterComponent;
  let fixture: ComponentFixture<VetRegisterComponent>;

  beforeEach(async () => {
    await setupTestModule(VetRegisterComponent);
    fixture = TestBed.createComponent(VetRegisterComponent);

    fixture = TestBed.createComponent(VetRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
