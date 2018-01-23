import {Field} from '../../../../_models/field';
import {FormBuilder} from '../../../../_models/form_builder';
import {EventEmitter} from '@angular/core';

export interface DynamicFieldInterface {
  model: any;
  field: Field;
  form: FormBuilder;
  updateModel: EventEmitter<any>;
}
