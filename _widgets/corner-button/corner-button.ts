import {Component, Input} from '@angular/core';

@Component({
  selector: 'corner-button',
  template: `<a class="btn icon-btn btn-{{class}}" role="button">
                <span class="btn-corner fa fa-{{icon}} img-circle text-muted"></span>
                <ng-content></ng-content>
            </a>`,
  styles: [`
    .btn-corner { padding:8px; background:#ffffff; margin-right:4px; width: 32px}
    .icon-btn { padding: 2px 15px 3px 2px; border-radius:50px;}
  `]
})

export class CornerButtonComponent {

  @Input() class: string;
  @Input() icon: string;
  constructor() { }
}
