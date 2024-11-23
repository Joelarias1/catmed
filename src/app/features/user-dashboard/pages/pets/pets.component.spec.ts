import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsComponent } from './pets.component';
import { setupTestModule } from '@app/utils/test-utils';

describe('PetsComponent', () => {
  let component: PetsComponent;
  let fixture: ComponentFixture<PetsComponent>;

  beforeEach(async () => {
    await setupTestModule(PetsComponent);
    fixture = TestBed.createComponent(PetsComponent);

    fixture = TestBed.createComponent(PetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
