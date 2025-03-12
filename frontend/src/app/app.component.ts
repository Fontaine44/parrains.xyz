import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AlertComponent, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Parrains';

  constructor(
    readonly _router: Router,
  ) {}
}
