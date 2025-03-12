import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokeParrainsComponent } from './components/poke-parrains/poke-parrains.component';
import { PokeParrainsMobileComponent } from './components/poke-parrains-mobile/poke-parrains-mobile.component';
import { PokeParrainsGuard } from './guards/poke-parrains/poke-parrains.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'pokeparrains',
    component: PokeParrainsComponent,
    canActivate: [PokeParrainsGuard]
  },
  {
    path: 'm/pokeparrains',
    component: PokeParrainsMobileComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
