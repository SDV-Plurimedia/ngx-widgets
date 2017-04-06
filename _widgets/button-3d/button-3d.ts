import {Component, Input} from '@angular/core';
@Component({
  selector: 'button3d',
  template: `<button type="button" class="btn btn-{{class}} {{size}} btn3d">
  <span class="fa fa-{{icon}}"></span> <ng-content></ng-content>
  </button>`,
  styleUrls: ['./button-3d.css']
})
export class Button3dComponent {
  @Input() icon: string;
  @Input() class: string = 'default';
  @Input() size: string = '';

  constructor() { }
}
