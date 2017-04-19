import {Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'chevron',
  templateUrl: './chevron.html',
  styleUrls: ['./chevron.css']
})
export class ChevronComponent {
  @Input() is_hidden: boolean = false;
  @Output() emitHidden:EventEmitter<boolean>;

  constructor() {
    this.emitHidden = new EventEmitter<boolean>();
  }

  change(event) {
    this.is_hidden = !this.is_hidden;
    this.emitHidden.emit(this.is_hidden);
  }
}
