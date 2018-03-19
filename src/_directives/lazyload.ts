import {Directive, ElementRef, Renderer, Input} from '@angular/core';

@Directive({
  selector: '[lazyload]'
})
export class LazyloadDirective {
  @Input('lazyload') img: string;

  /**
   * Instantiation de la Directive
   * @param _element
   * @param _renderer
   */
  constructor(private _element: ElementRef, private _renderer: Renderer) {
    jQuery(this._element.nativeElement).attr('src', '/images/loading_spinner.gif');

    jQuery().ready(() => {
      jQuery(document).scroll((eventObject) => {
        this.onScroll();
      });
      jQuery(document).scroll();
    });
  }

  /**
   * Méthode appelée en cas de scroll dans la page pour afficher ou non une images
   */
  onScroll() {
    // this._element.nativeElement
    let element =   jQuery(this._element.nativeElement);
    let offset = element.offset();
    let scrollTop = jQuery(document).scrollTop();
    let clientHeight = document.body.clientHeight;

    if ((clientHeight + scrollTop) >= offset.top && element.attr('src') !== this.img ) {
      element.fadeOut(500, () => {
        element.attr('src', this.img);
        element.fadeIn(500);
      });
    }
  }
}
