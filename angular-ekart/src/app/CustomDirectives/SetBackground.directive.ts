import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[setBackground]',
  standalone: true,
})
export class SetBackgraoud implements OnInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {
    //this.element = element;
    this.setBackgrAndColor = { backColor: '#36454F', textColor: 'White' };
  }

  // @Input('setBackground') backColor: string = '#36454F';
  // @Input() textColor: string = 'White';

  @Input('setBackground') setBackgrAndColor: {
    backColor?: string;
    textColor?: string;
  };

  ngOnInit(): void {
    // this.element.nativeElement.style.backgroundColor = '#36454f';
    // this.element.nativeElement.style.color = 'white';

    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.setBackgrAndColor.backColor
    );
    this.renderer.setStyle(
      this.element.nativeElement,
      'color',
      this.setBackgrAndColor.textColor
    );
  }
}
