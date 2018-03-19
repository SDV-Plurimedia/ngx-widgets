import {FieldComponent} from '../field';
import {AfterViewChecked, Component} from '@angular/core';

@Component({
  selector: 'field-autocomplete',
  templateUrl: './autocomplete.html'
})
export class FieldAutocompleteComponent extends FieldComponent implements AfterViewChecked{

  /**
   * On gère la validité dès le début car elle n'est pas gérée avec les ngForm.
   */
  ngAfterViewChecked() {
    this.specificInputCheck();
  }

  /**
   * Cas particulier des autocompletes. On envoit sur les méthodes qui gère l'ajoute et la suppression.
   * La gestion doit se faire la dedans.
   * @param event
   * @param add
   * @returns
   */
  checkValidity(event, add: boolean = true): boolean {
    let valid: boolean;
    if(add) {
      valid = this.field.add.apply(this.field.scope, [event]);
    } else {
      valid = this.field.delete.apply(this.field.scope, [event]);
    }

    // Si on ne renvoit rien, on mets res à true pour ne pas avoir le message d'erreur qui apparait.
    if (typeof(valid) === 'undefined') {
      valid = true;
      if (this.field.required) {
        if(this.model[this.field.id]) {
          if(!this.model[this.field.id].length) {
            valid = false;
          }
        } else {
          valid = false;
        }
      }
    }

    this.field.invalid = !valid;
    this.field.error_message.hidden = valid;
    return valid;
  }
}
