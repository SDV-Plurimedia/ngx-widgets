import {Component, Input} from '@angular/core';
@Component({
  selector: 'status-bar',
  template: `<div class="update-nag">
            <div class="update-split update-{{class}}"><span class="fa fa-{{icon}}"></span></div>
            <div class="update-text"> <ng-content></ng-content> </div>
          </div>`,
  styleUrls: ['./status-bar.css']
})
export class StatusBarComponent {
  @Input() class: string;
  @Input() icon: string;

  constructor() { }
}
