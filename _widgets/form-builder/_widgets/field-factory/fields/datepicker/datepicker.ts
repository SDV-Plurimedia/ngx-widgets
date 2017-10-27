import {AfterViewChecked, Component} from '@angular/core';
import {FieldComponent} from '../field';

@Component({
  selector: 'field-datepicker',
  templateUrl: './datepicker.html',
})

export class FieldDatepickerComponent extends FieldComponent implements AfterViewChecked {

  /**
   * On déclenche la méthode de validation car le ng-valid/ng-invalid n'est pas mis sur ce composant.
   */
  ngAfterViewChecked() {
    this.specificInputCheck();
  }
}
