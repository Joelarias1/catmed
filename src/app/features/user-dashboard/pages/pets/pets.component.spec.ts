import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetsComponent } from './pets.component';
import { setupTestModule } from '@app/utils/test-utils';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('PetsComponent', () => {
  let component: PetsComponent;
  let fixture: ComponentFixture<PetsComponent>;

  beforeEach(async () => {
    await setupTestModule(
      PetsComponent,
      [ReactiveFormsModule],
      [provideHttpClient()]
    );

    fixture = TestBed.createComponent(PetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
