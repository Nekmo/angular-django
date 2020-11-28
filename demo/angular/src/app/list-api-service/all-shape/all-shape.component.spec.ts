import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllShapeComponent } from './all-shape.component';

describe('AllShapeComponent', () => {
  let component: AllShapeComponent;
  let fixture: ComponentFixture<AllShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllShapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
