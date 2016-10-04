import {Component} from '@angular/core';
@Component({
  selector: 'corner-button',
  template: `<a class="btn icon-btn btn-{{class}}" role="button"><span class="btn-corner fa fa-{{icon}} img-circle text-muted"></span><ng-content></ng-content></a>`,
  styles: [`
    .btn-corner { padding:8px; background:#ffffff; margin-right:4px; width: 32px}
    .icon-btn { padding: 2px 15px 3px 2px; border-radius:50px;}
  `],
  inputs: ['class', 'icon']
})
export class CornerButtonComponent {
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
