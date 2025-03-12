import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeParrainsMobileComponent } from './poke-parrains-mobile.component';

describe('PokeParrainsMobileComponent', () => {
  let component: PokeParrainsMobileComponent;
  let fixture: ComponentFixture<PokeParrainsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeParrainsMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeParrainsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
