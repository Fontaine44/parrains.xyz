import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PokeParrainsGuard implements CanActivate {
  constructor(
    readonly _router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot,): boolean {

    if (route.routeConfig?.path === 'pokeparrains' && window.innerWidth <= 768) {
      this._router.navigate(['/m/pokeparrains']);
      return false;
    } else if (route.routeConfig?.path === 'm/pokeparrains' && window.innerWidth > 768) {
      this._router.navigate(['/pokeparrains']);
      return false;
    }

    return true;
  }
}
