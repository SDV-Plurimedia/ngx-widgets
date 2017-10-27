import {AfterViewChecked, Component} from '@angular/core';
import {FieldComponent} from '../field';

@Component({
  selector: 'field-radios',
  templateUrl: './radios.html',
})

export class FieldRadiosComponent extends FieldComponent implements AfterViewChecked {

  /**
   * On déclenche la méthode de validation car le ng-valid/ng-invalid n'est pas mis sur ce composant.
   */
  ngAfterViewChecked() {
    this.checkValidity(null, false);
  }

}
