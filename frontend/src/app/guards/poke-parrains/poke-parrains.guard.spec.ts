import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pokeParrainsGuard } from './poke-parrains.guard';

describe('pokeParrainsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pokeParrainsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
