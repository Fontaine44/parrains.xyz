import { Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import VanillaTilt, { TiltOptions } from 'vanilla-tilt';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() url: string = '';
  @Input() size: number = 400;

  @ViewChild('card', { static: true }) cardElement!: ElementRef;

  private isDragging = false;
  private hasMoved = false;
  private startX = 0;
  private startY = 0;
  private offsetX = 0;
  private offsetY = 0;
  private tiltOptions: TiltOptions = {
    max: 20,
    speed: 400,
    scale: 1.04,
    glare: true,
    'max-glare': 0.5
  }

  constructor(
    private _renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.cardElement.nativeElement.vanillaTilt) {
      VanillaTilt.init(this.cardElement.nativeElement, this.tiltOptions);
    }
  }

  @HostListener('mousedown', ['$event'])
  onCardMouseDown(event: MouseEvent): void {
    if (event.button !== 0) { // left click
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.isDragging = true;
    this.startX = event.clientX - this.offsetX;
    this.startY = event.clientY - this.offsetY;

    this.cardElement.nativeElement.vanillaTilt?.destroy();

    this._renderer.addClass(this.cardElement.nativeElement, 'dragging');
  }

  @HostListener('mouseup', ['$event'])
  onCardMouseUp(): void {
    if (this.isDragging) {
      this.isDragging = false;
      this._renderer.removeClass(this.cardElement.nativeElement, 'dragging');

      if (this.hasMoved) {
        this.resetPosition();
      }
    }
  }

  @HostListener('mousemove', ['$event'])
  onCardMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.hasMoved = true;

      this.offsetX = event.clientX - this.startX;
      this.offsetY = event.clientY - this.startY;

      let angle = 0;
      if (this.offsetX > 0) {
        angle = Math.min(this.offsetX / 75, 10);
      } else if (this.offsetX < 0) {
        angle = Math.max(this.offsetX / 75,  -10);
      }
      
      this.cardElement.nativeElement.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) rotate(${angle}deg)`;
    }
  }

  private resetPosition(): void {
    this.hasMoved = false;

    this._renderer.addClass(this.cardElement.nativeElement, 'transition');

    this.offsetX = 0;
    this.offsetY = 0;
    this.cardElement.nativeElement.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
    this.cardElement.nativeElement.addEventListener('transitionend', this.onTransitionEnd.bind(this));
  }

    private onTransitionEnd(): void {
      this._renderer.removeClass(this.cardElement.nativeElement, 'transition');
    this.cardElement.nativeElement.removeEventListener('transitionend', this.onTransitionEnd.bind(this));
  }
}
