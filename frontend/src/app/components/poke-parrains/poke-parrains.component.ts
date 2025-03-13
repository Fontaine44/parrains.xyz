import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@shared/components/card/card.component';
import { PackComponent } from '@shared/components/pack/pack.component';

@Component({
  selector: 'app-poke-parrains',
  imports: [CommonModule, CardComponent, PackComponent],
  templateUrl: './poke-parrains.component.html',
  styleUrl: './poke-parrains.component.scss'
})
export class PokeParrainsComponent {

  cards = false;

  packOpened(): void {
    this.cards = true;
  }
}
