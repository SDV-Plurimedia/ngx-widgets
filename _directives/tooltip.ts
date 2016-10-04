import {Directive, ElementRef, Renderer, Input} from '@angular/core';

@Directive({
  selector: '[tooltip]',
  inputs: [
    'text: tooltip'
  ],
  host: {
    '(mouseover)': 'show()'
  }
})
export class TooltipDirective {
  text: string;

  constructor(private _element: ElementRef, private renderer: Renderer) {
      //renderer.setElementStyle(_element, 'color', 'red');
  }

  show() {
    console.log(this.text);
  }
}
