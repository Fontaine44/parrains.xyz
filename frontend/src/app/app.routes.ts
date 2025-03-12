import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokeparrainsComponent } from './components/pokeparrains/pokeparrains.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'pokeparrains',
    component: PokeparrainsComponent
  },
  {
    path: '**',
    redirectTo: '',
  }
];
