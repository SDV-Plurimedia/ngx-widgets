import {Component} from '@angular/core';
/// <reference path="../../../node_modules/@types/bootstrap-switch/index.d.ts"/>
import { StaticLoaderService } from "../../../_core/_services/static-loader";

@Component({
  selector: 'switch',
  templateUrl: './switch.html',
  styleUrls: ['./switch.css'],
  inputs: ['switch']
})

export class SwitchComponent {
  public switch : Switch;
  public dependenciesAreLoaded: boolean;
  public dependenciesAreLoadedPromise: Promise<any>;

  constructor(){
    let Loader:StaticLoaderService = StaticLoaderService.getInstance();
    this.dependenciesAreLoadedPromise = Loader.require_once([
      "/assets/bootstrap-switch/dist/js/bootstrap-switch.min.js",
      "/assets/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css"
    ]).then(()=>{
      this.dependenciesAreLoaded = true;
    });
  }

  ngOnInit() {
    let innerScope = this;
    this.dependenciesAreLoadedPromise.then(() => {
      innerScope.switch.options.onSwitchChange = (event, state) => {
        if(state == true)
          innerScope.switch.callback_on.apply(innerScope.switch.scope);
        else  innerScope.switch.callback_off.apply(innerScope.switch.scope);
      };

      jQuery('#switch').bootstrapSwitch(this.switch.options);
      jQuery('.bootstrap-switch-handle-on, .bootstrap-switch-handle-off, .bootstrap-switch-label')
          .css('height', 'auto');
    });
  }

}


export interface Switch {
  scope : any;
  callback_on: () => void ;
  callback_off: () => void;
  active: boolean;
  options?: BootstrapSwitch.BootstrapSwitchOptions;
}
