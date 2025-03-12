import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-poke-parrains',
  imports: [CommonModule, CardComponent],
  templateUrl: './poke-parrains.component.html',
  styleUrl: './poke-parrains.component.scss'
})
export class PokeParrainsComponent {

}
