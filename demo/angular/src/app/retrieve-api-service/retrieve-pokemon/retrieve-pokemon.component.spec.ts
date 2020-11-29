import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievePokemonComponent } from './retrieve-pokemon.component';

describe('RetrievePokemonComponent', () => {
  let component: RetrievePokemonComponent;
  let fixture: ComponentFixture<RetrievePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrievePokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrievePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
