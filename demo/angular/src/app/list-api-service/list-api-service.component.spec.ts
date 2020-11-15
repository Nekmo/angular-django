import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApiServiceComponent } from './list-api-service.component';

describe('ListApiServiceComponent', () => {
  let component: ListApiServiceComponent;
  let fixture: ComponentFixture<ListApiServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListApiServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApiServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
