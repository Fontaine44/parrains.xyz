import { Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() url: string = '';
  @Input() size: number = 300;

  @ViewChild('card', { static: true }) cardElement!: ElementRef;

  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private offsetX = 0;
  private offsetY = 0;

  constructor(
    private _renderer: Renderer2
  ) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
    this.startX = event.clientX - this.offsetX;
    this.startY = event.clientY - this.offsetY;
    this._renderer.removeClass(this.cardElement.nativeElement, 'transition');
    this._renderer.addClass(this.cardElement.nativeElement, 'dragging');
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.isDragging) {
      this.isDragging = false;
      this.resetPosition();
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
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
    this.offsetX = 0;
    this.offsetY = 0;
    this._renderer.addClass(this.cardElement.nativeElement, 'transition');
    this.cardElement.nativeElement.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
    this.cardElement.nativeElement.addEventListener('transitionend', this.onTransitionEnd.bind(this));
  }

    private onTransitionEnd(): void {
    this._renderer.removeClass(this.cardElement.nativeElement, 'dragging');
    this.cardElement.nativeElement.removeEventListener('transitionend', this.onTransitionEnd.bind(this));
  }
}
