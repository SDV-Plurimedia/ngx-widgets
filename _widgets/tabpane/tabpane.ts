import {Component, Input} from '@angular/core';

@Component({
  selector: 'tabpane',
  templateUrl: './tabpane.html'
})

export class TabpaneComponent {
  public tabs: any[];
  @Input() panel_mode: boolean = false;


  constructor() {
    this.tabs = [];
  }

  private selectTab(tab) {
    this.tabs.forEach(t => t.active = false);
    tab.active = true;
  }
  addTab(tab: any) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}
