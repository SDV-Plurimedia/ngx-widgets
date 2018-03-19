import {AfterViewChecked, Component} from '@angular/core';
import {FieldComponent} from '../field';

@Component({
  selector: 'field-checkboxes',
  templateUrl: './checkboxes.html',
})

export class FieldCheckboxesComponent extends FieldComponent implements AfterViewChecked {

  /**
   * Si les checkboxes ont une méthode spéciale à appliquer dessus (par ex : il faut au moins en avoir deux de cocher etc...)
   */
  ngAfterViewChecked() {
    let valid: boolean = true;

    if (this.field.verifyFunction) {
      valid = this.field.verifyFunction.apply(this.field.scope, [this.field]);
    }

    this.field.invalid = !valid;
  }

  /**
   * Vérifie la validité des checkboxes (en appellant la méthode de callback ou en vérifiant si c'est required et que y a 0 choix).
   * Mets également les bonnes valeurs en fonctions des checkboxes séléctionnées dans le model. (pas true ou false, mais la valeur réelle).
   * @param event
   * @param value
   * @returns
   */
  checkValidity(event, value): boolean {
    let valid: boolean = true;

    if (event.target.checked) {
      this.model[this.field.id].push(value);
    } else {
      let index = this.model[this.field.id].indexOf(value);
      if (index > -1) {
        this.model[this.field.id].splice(index, 1);
      }
    }

    if (this.field.verifyFunction) {
      valid = this.field.verifyFunction.apply(this.field.scope);
    } else if(this.field.required) {
      if (this.model[this.field.id].length === 0) {
        valid = false;
      }
    }

    this.field.invalid = !valid;
    this.field.error_message.hidden = valid;
    return valid;
  }

}
