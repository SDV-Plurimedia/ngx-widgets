import {Component} from '@angular/core';
@Component({
  selector: 'status-bar',
  template: `<div class="update-nag">
            <div class="update-split update-{{class}}"><span class="fa fa-{{icon}}"></span></div>
            <div class="update-text"> <ng-content></ng-content> </div>
          </div>`,
  styleUrls: ['./status-bar.css'],
  inputs: ['class','icon']
})
export class StatusBarComponent {
  public class: string;
  public icon: string;

  constructor(){
  }
  ngOnInit() {
    // Properties are resolved
  }
  ngOnDestroy() {
    // Speak now or forever hold your peace
  }
  ngDoCheck() {
    // Custom change detection
  }
  ngOnChanges(changes) {
    // Called right after our bindings have been checked but only
    // if one of our bindings has changed.
    //
    // changes is an object of the format:
    // {
    //   'prop': PropertyUpdate
    // }
  }
  ngAfterContentInit() {
    // Component content has been initialized
  }
  ngAfterContentChecked() {
    // Component content has been Checked
  }
  ngAfterViewInit() {
    // Component views are initialized
  }
  ngAfterViewChecked() {
    // Component views have been checked
  }
}
