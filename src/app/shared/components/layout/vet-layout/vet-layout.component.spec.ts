import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetLayoutComponent } from './vet-layout.component';

describe('VetLayoutComponent', () => {
  let component: VetLayoutComponent;
  let fixture: ComponentFixture<VetLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
