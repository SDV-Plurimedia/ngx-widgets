import {Component, Input, Output, EventEmitter, OnInit, OnChanges}     from '@angular/core';

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.html'
})
export class DropdownComponent implements OnInit, OnChanges {
  @Input() data: Array<any> = [];
  @Input() config: any = {
    champ_value: 'value',
    champ_label: 'label'
  };
  @Input() icon: string;
  @Input() value: string;
  @Output() valueChange: EventEmitter<any>;

  public selected_obj: any;

  constructor() {
    this.valueChange = new EventEmitter<any>();
  }

  ngOnInit() {
    if (!this.selected_obj) {
      this.selected_obj = this.data[0];
    }
  }

  ngOnChanges() {
    this.findObjByValue(this.value);
  }

  private findObjByValue(val) {
    let objet = this.data.find((obj) => {
      return obj[this.config.champ_value] === val;
    });
    if (objet) {
      this.selected_obj = objet;
    }
  }

  private findValueByObj(obj) {
    this.value = obj[this.config.champ_value];
    this.valueChange.emit(this.value);
  }

  private select(obj) {
    this.selected_obj = obj;
    this.findValueByObj(obj);
  }
}
