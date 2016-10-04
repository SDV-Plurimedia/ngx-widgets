/*import {Directive, OnChanges, ElementRef, Input} from '@angular/core';
import {AnimationBuilder} from '@angular/platform-browser/src/animate/animation_builder';
import {CssAnimationBuilder} from '@angular/platform-browser/src/animate/css_animation_builder';

@Directive({
  selector: '[collapse]',
  host: {
    '[attr.aria-expanded]': '!collapse',
    '[attr.aria-hidden]': 'collapse'
  }
})

export class CollapseDirective implements OnChanges  {
  public duration: number = 500;
  @Input() collapse: boolean;
  private _animation: CssAnimationBuilder;

  constructor(
    private _element: ElementRef,
    animationBuilder: AnimationBuilder
  ) {
    this._animation = animationBuilder.css();
  }

  ngOnChanges(changes) {
    if (changes.collapse) {
      if (this.collapse) {
        this.hide()
      } else {
        this.show();
      }
    }
  }

  hide() {
    this._baseSequence
      .setFromStyles({
        height: this._element.nativeElement.scrollHeight + 'px',
        overflow: 'hidden'
      })
      .setToStyles({
        height: '0',
        paddingTop: '0',
        paddingBottom: '0',
        display: ''
      });

    let a = this._animation.start(this._element.nativeElement);
    a.onComplete(() => {
      a.removeClasses(['in']); // rapid change will leave in
      a.addClasses(['collapse']);
    });
  }

  show() {
    this._animation
      .setDuration(0)
      .addClass('in')
      .setFromStyles({
        overflow: 'hidden'
      })
      .setToStyles({
        paddingTop: '',
        paddingBottom: '',
        display: 'block',
      })
      .start(this._element.nativeElement)
      .onComplete(() => {
        let a = this._baseSequence
          .setFromStyles({
            height: '0'
          })
          .setToStyles({
            height: this._element.nativeElement.scrollHeight + 'px'
          })
          .start(this._element.nativeElement);

        a.onComplete(() =>  a.addClasses(['collapse', 'in'])  );
    });
  }

  private get _elementHeight() {
    let el = this._element.nativeElement;
    var height = el.offsetHeight;
    var style = getComputedStyle(el);
    return height + parseInt(style.marginTop)+ parseInt(style.marginBottom);
  }

  private get _baseSequence() {
    return this._animation.setDuration(this.duration).removeClass('collapse')
                .removeClass('in').addAnimationClass('collapsing');
  }
}
*/
