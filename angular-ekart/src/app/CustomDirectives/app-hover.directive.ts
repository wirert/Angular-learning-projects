import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHover]',
  standalone: true,
})
export class AppHoverDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostBinding('style.backgroundColor') backgroundColor: string = '#28282b';
  @HostBinding('style.border') border: string = 'none';
  @HostBinding('style.color') color: string = 'white';

  @HostListener('mouseenter') OnMouseEnter() {
    this.backgroundColor = 'white';
    this.color = '#28282b';
    this.border = 'solid 3px #28282b';
  }

  @HostListener('mouseout') OnMouseOut() {
    this.backgroundColor = '#28282b';
    this.color = 'white';
    this.border = 'none';
  }
}
