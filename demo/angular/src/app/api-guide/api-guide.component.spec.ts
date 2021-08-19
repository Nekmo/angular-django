import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiGuideComponent } from './api-guide.component';

describe('ApiGuideComponent', () => {
  let component: ApiGuideComponent;
  let fixture: ComponentFixture<ApiGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
