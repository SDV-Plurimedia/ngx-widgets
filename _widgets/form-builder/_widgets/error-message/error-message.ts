import {Component, Input} from '@angular/core';
import {Field} from '../../_models/field';
import {ErrorMessageHelper} from '../../_helpers/error_message_helper';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.html',
  styleUrls: ['./error-message.css']
})
export class ErrorMessageComponent {
  @Input() field: Field = null;
  @Input() model: any;

  defaultErrorMessage() {
    return ErrorMessageHelper.defaultErrorMessage(this.field, this.model);
  }

}
