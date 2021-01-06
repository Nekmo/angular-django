import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDjangoMaterialTableComponent } from './angular-django-material-table.component';

describe('AngularDjangoMaterialTableComponent', () => {
  let component: AngularDjangoMaterialTableComponent;
  let fixture: ComponentFixture<AngularDjangoMaterialTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularDjangoMaterialTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularDjangoMaterialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
