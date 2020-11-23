import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstStepsComponent } from './first-steps.component';

describe('FirstStepsComponent', () => {
  let component: FirstStepsComponent;
  let fixture: ComponentFixture<FirstStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
