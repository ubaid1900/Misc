  import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]'
})
export class HoverHighlightDirective {

  @Input() appHighlightColor: BackForeColors;
  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.color = this.appHighlightColor.foreColor;
    this.element.nativeElement.style.backgroundColor = this.appHighlightColor.backColor;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.color = null;
    this.element.nativeElement.style.backgroundColor = null;
  }
  constructor(private element: ElementRef) {
  }

}

export class BackForeColors {
  backColor: string;
  foreColor: string;
}
