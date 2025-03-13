import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import VanillaTilt, { TiltOptions } from 'vanilla-tilt';

@Component({
  selector: 'app-pack',
  imports: [],
  templateUrl: './pack.component.html',
  styleUrl: './pack.component.scss'
})
export class PackComponent implements AfterViewInit {

  @Input() url: string = '';
  @Input() size: number = 300;

  @Output() packOpenedEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('pack', { static: true }) packElement!: ElementRef;
  
  private tiltOptions: TiltOptions = {
    max: 10,
    speed: 200
  }

  constructor(
    readonly _renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    VanillaTilt.init(this.packElement.nativeElement, this.tiltOptions);
  }

  openPack(): void {
    this._renderer.addClass(this.packElement.nativeElement, 'fade-out');
    setTimeout(() => {
      this.packOpenedEvent.emit();
    }, 800);
  }
}
