import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatePokemonComponent } from './paginate-pokemon.component';

describe('PaginatePokemonComponent', () => {
  let component: PaginatePokemonComponent;
  let fixture: ComponentFixture<PaginatePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatePokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
