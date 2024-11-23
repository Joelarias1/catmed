import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsComponent } from './appointments.component';
import { setupTestModule } from '@app/utils/test-utils';

describe('AppointmentsComponent', () => {
  let component: AppointmentsComponent;
  let fixture: ComponentFixture<AppointmentsComponent>;

  beforeEach(async () => {
    await setupTestModule(AppointmentsComponent);
    fixture = TestBed.createComponent(AppointmentsComponent);

    fixture = TestBed.createComponent(AppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
