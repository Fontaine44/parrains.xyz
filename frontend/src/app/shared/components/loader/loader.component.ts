import { Component, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnChanges {

  @Input() trigger: boolean = false;

  constructor(
    readonly _renderer: Renderer2,
    readonly el: ElementRef,
  ) {}

  ngOnChanges(): void {
    if (this.trigger) {
      this.el.nativeElement.style.display = 'block';
      setTimeout(() => {
        this._renderer.addClass(this.el.nativeElement, 'loaded');
      }, 1);
    }
  }
}
