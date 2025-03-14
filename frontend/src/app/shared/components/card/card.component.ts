import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import VanillaTilt, { TiltOptions } from 'vanilla-tilt';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() src: string = '';
  @Input() size: number = 250;
  @Input() isDraggable: boolean = false;

  @ViewChild('card', { static: true }) cardElement!: ElementRef;

  private isDragging = false;
  private hasMoved = false;
  private isFlipped = false;
  private startX = 0;
  private startY = 0;
  private offsetX = 0;
  private offsetY = 0;
  private tiltOptions: TiltOptions = {
    max: 20,
    speed: 400,
    scale: 1.1,
    glare: true,
    'max-glare': 0.5
  }

  constructor(
    private _renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    if (this.isDraggable) {
      this.initDraggable();
    } else {
      this.initTilt();
    }
  }

  initDraggable(): void {
    this.cardElement.nativeElement.style.cursor = 'grab';
    this.cardElement.nativeElement.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.cardElement.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.cardElement.nativeElement.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.cardElement.nativeElement.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  initTilt(): void {
    VanillaTilt.init(this.cardElement.nativeElement, this.tiltOptions);
  }

  destroyTilt(): void {
    this.cardElement.nativeElement.vanillaTilt?.destroy();
  }

  flipCard(): void {
    if (!this.isFlipped) {
      this.destroyTilt();
      this._renderer.addClass(this.cardElement.nativeElement, 'flipped');
      this._renderer.addClass(this.cardElement.nativeElement, 'no-shadow');
      
      const audio = new Audio('flip.mp3');
      audio.volume = 0.1;
      audio.play();

      setTimeout(() => {
        this._renderer.removeClass(this.cardElement.nativeElement, 'no-shadow');
        this.initTilt();
        this.isFlipped = true;
      }, 800);
    }
  }

  onMouseEnter(): void {
    if (!this.cardElement.nativeElement.vanillaTilt) {
      this.initTilt();
    }
  }

  onMouseDown(event: MouseEvent): void {
    if (event.button !== 0 || !this.isFlipped) { // left click or not flipped
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.isDragging = true;
    this.startX = event.clientX - this.offsetX;
    this.startY = event.clientY - this.offsetY;

    this.destroyTilt();

    this._renderer.addClass(this.cardElement.nativeElement, 'dragging');
  }

  onMouseUp(): void {
    if (this.isDragging) {
      this.isDragging = false;
      this._renderer.removeClass(this.cardElement.nativeElement, 'dragging');

      if (this.hasMoved) {
        this.resetPosition();
      }
    }
  }

  onMouseMove(event: MouseEvent): void {
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

  resetPosition(): void {
    this.hasMoved = false;

    this._renderer.addClass(this.cardElement.nativeElement, 'transition');

    this.offsetX = 0;
    this.offsetY = 0;
    this.cardElement.nativeElement.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
    this.cardElement.nativeElement.addEventListener('transitionend', this.onTransitionEnd.bind(this));
  }

  onTransitionEnd(): void {
    this._renderer.removeClass(this.cardElement.nativeElement, 'transition');
    this.cardElement.nativeElement.removeEventListener('transitionend', this.onTransitionEnd.bind(this));
  }

  ngOnDestroy(): void {
    if (this.isDraggable) {
      this.cardElement.nativeElement.removeEventListener('mouseenter', this.onMouseEnter.bind(this));
      this.cardElement.nativeElement.removeEventListener('mousedown', this.onMouseDown.bind(this));
      this.cardElement.nativeElement.removeEventListener('mouseup', this.onMouseUp.bind(this));
      this.cardElement.nativeElement.removeEventListener('mousemove', this.onMouseMove.bind(this));
    }

    this.destroyTilt();
  }
}
