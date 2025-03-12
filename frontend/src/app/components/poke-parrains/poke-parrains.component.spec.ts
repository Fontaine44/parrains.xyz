import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeParrainsComponent } from './poke-parrains.component';

describe('PokeParrainsComponent', () => {
  let component: PokeParrainsComponent;
  let fixture: ComponentFixture<PokeParrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeParrainsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeParrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
