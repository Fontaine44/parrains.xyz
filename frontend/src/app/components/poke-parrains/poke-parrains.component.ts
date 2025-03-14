import { Component, QueryList, ViewChildren } from '@angular/core';
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

  @ViewChildren(CardComponent) cardsItems!: QueryList<CardComponent>;

  isOpened = false;
  loader = false;
  cards = [
    { id: 0, number: this.randomCard() },
    { id: 1, number: this.randomCard() },
    { id: 2, number: this.randomCard() },
    { id: 3, number: this.randomCard() },
    { id: 4, number: this.randomCard() }
  ];

  packOpened(): void {
    this.loader = true;
    this.isOpened = true;

    setTimeout(() => {
      this.loader = false;
      this.cardsItems.first.flipCard();
    }, 2000);
  }

  randomCard(): number {
    return Math.floor(Math.random() * 3) + 1;
  }
}
