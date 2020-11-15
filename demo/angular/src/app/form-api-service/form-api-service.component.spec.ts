import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormApiServiceComponent } from './form-api-service.component';

describe('FormApiServiceComponent', () => {
  let component: FormApiServiceComponent;
  let fixture: ComponentFixture<FormApiServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormApiServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormApiServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
