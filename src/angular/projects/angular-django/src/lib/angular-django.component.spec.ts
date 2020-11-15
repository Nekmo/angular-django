import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDjangoComponent } from './angular-django.component';

describe('AngularDjangoComponent', () => {
  let component: AngularDjangoComponent;
  let fixture: ComponentFixture<AngularDjangoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularDjangoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularDjangoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
