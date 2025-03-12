import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeparrainsComponent } from './pokeparrains.component';

describe('PokeparrainsComponent', () => {
  let component: PokeparrainsComponent;
  let fixture: ComponentFixture<PokeparrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeparrainsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeparrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
