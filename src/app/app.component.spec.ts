import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setupTestModule } from '@utils/test-utils';
import { AppComponent } from '@app/app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await setupTestModule(AppComponent);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
