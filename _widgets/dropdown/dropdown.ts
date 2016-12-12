import {Component, Input, Output, EventEmitter, ElementRef}     from '@angular/core';
import {Component,Host, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.html',
})
export class DropdownComponent {
    @Input() data: Array<any>;
    @Input() config: any = {
      "champ_value": "value",
      "champ_label": "label"
    };
    @Output() valueOnChange: EventEmitter<any>;

    private innerValue: any;
    //accés à la value
    get value(): any {
        return this.innerValue;
    };
    //modification en prevenant le parent par l'emitter
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.valueOnChange.emit(v);
        }
    }

    constructor(){
      this.valueOnChange = new EventEmitter<any>();
    }


  }
