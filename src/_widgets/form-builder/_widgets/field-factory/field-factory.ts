import {Component, Input} from '@angular/core';
import {Field} from '../../_models/field';
import {FormBuilder} from '../../_models/form_builder';

@Component({
  selector: 'field-factory',
  templateUrl: 'field-factory.html',
  styleUrls: ['field-factory.css']
})
export class FieldFactoryComponent {
  @Input() public fields: Field[];
  @Input() public model: any;
  @Input() public form: FormBuilder = null;
}
