import {Component, Host, Input} from '@angular/core';
import {TabpaneComponent} from './tabpane';

@Component({
    selector: 'tab',
    styleUrls: ['./tabpane.css'],
    template: `
    <div [class.hidden]="!active" class="class-pane" role="tabpanel">
      <ng-content></ng-content>
    </div>
  `
})

export class TabComponent {
  @Input() tabtitle: string;
  @Input() active = false;

  constructor( @Host() tabs: TabpaneComponent) {
    tabs.addTab(this);
  }
}
