import {Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'chevron',
  templateUrl: './chevron.html',
  styleUrls: ['./chevron.css'],
  inputs: ['hidden'],
  outputs: ['hiddenChange']
})
export class ChevronComponent {
  public hiddenChange: EventEmitter<boolean>;
  public hidden = false;

  constructor(){
    this.hiddenChange = new EventEmitter<boolean>();
  }

  change(){
    this.hidden = !this.hidden;
    this.hiddenChange.emit(this.hidden);
  }
}
