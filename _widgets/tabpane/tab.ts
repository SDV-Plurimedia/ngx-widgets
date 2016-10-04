import {Component, Host} from '@angular/core';
import {TabpaneComponent} from './tabpane';

@Component({
    selector: 'tab',
    inputs: [
        'title:tabtitle',
        'active'
    ],
    styles: [`
    .hidden{
      display:none;
    }
  `],
    template: `
    <div [class.hidden]="!active" class="class-pane" role="tabpanel">
      <ng-content></ng-content>
    </div>
  `
})

export class TabComponent{
  public title: string;
  public active = false;

  constructor( @Host() tabs: TabpaneComponent) {
    tabs.addTab(this);
  }
}
