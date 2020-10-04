import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveApiServiceComponent } from './retrieve-api-service.component';

describe('RetrieveApiServiceComponent', () => {
  let component: RetrieveApiServiceComponent;
  let fixture: ComponentFixture<RetrieveApiServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrieveApiServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrieveApiServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
