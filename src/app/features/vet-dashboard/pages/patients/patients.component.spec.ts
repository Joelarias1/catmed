import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsComponent } from './patients.component';
import { setupTestModule } from '@app/utils/test-utils';

describe('PatientsComponent', () => {
  let component: PatientsComponent;
  let fixture: ComponentFixture<PatientsComponent>;

  beforeEach(async () => {
    await setupTestModule(PatientsComponent);

    fixture = TestBed.createComponent(PatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
