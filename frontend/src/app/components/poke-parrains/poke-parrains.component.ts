import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@shared/components/card/card.component';
import { PackComponent } from '@shared/components/pack/pack.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';

@Component({
  selector: 'app-poke-parrains',
  imports: [CommonModule, CardComponent, PackComponent, LoaderComponent],
  templateUrl: './poke-parrains.component.html',
  styleUrl: './poke-parrains.component.scss'
})
export class PokeParrainsComponent {

  cards = false;
  loader = false;


  packOpened(): void {
    this.loader = true;
    setTimeout(() => {
      this.cards = true;
      this.loader = false;
    }, 1000);
  }
}
