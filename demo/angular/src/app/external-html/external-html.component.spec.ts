import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalHtmlComponent } from './external-html.component';

describe('ExternalHtmlComponent', () => {
  let component: ExternalHtmlComponent;
  let fixture: ComponentFixture<ExternalHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalHtmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
