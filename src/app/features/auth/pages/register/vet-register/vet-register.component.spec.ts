import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetRegisterComponent } from './vet-register.component';

describe('VetRegisterComponent', () => {
  let component: VetRegisterComponent;
  let fixture: ComponentFixture<VetRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
