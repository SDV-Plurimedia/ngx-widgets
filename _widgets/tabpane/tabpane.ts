
import {Component} from '@angular/core';

@Component({
  selector: 'tabpane',
  templateUrl: './tabpane.html',
  inputs: ['panel_mode']
})

export class TabpaneComponent {
  public tabs : any[];
  public panel_mode: boolean = false;


  constructor() {
    this.tabs = [];
  }

  private selectTab(tab) {
    this.tabs.forEach((tab) => tab.active=false);
    tab.active= true;
  }
  addTab(tab: any) {
    if(this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}
