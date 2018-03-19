import {Component, Input, OnInit} from '@angular/core';
import {Field} from '../../../_models/field';
import {FormBuilder} from '../../../_models/form_builder';
import {ValidatorHelper} from '../../../_helpers/validator_helper';

@Component({
  template: ``
})
export class FieldComponent implements OnInit {

  @Input() public field: Field;
  @Input() public model: any;
  @Input() public form: FormBuilder = null;

  ngOnInit() {
    if (typeof this.model[this.field.id] === 'undefined') {
      console.warn('La propriété : ' + this.field.id + ' n\'existe pas sur l\'objet ' + this.model.constructor.name);
    }
  }

  /**
   * Vérifie la validité d'un champ par le biais d'une méthode de callback ou d'une méthode définie d'un helper.
   * @param event
   * @param displayMessage
   * @returns
   */
  checkValidity(event, displayMessage: boolean = true): boolean {

    let valid : boolean = false;
    // Si on a défini une fonction de vérification custom, on utilise celle là.
    if (this.field.verifyFunction) {
      // On appelle la fonction custom avec pour param l'objet Field.
      valid = this.field.verifyFunction.apply(this.field.scope, [this.field]);
    } else {
      if (this.form.ngForm.controls[this.field.id]) {
        // Sinon, on applique par défaut une méthode définie dans un helper.
        switch (this.field.type) {
          case 'number':
            valid = ValidatorHelper.checkNumber(this.field, this.model);
          break;

          case 'datepicker': case 'ckeditor': case 'autocomplete':
            valid = this.specificInputCheck();
          break;

          case 'url':
            valid = ValidatorHelper.checkUrl(this.field, this.model);
          break;

          default:
            valid = ('VALID' === this.form.ngForm.controls[this.field.id]._status);
          break;
        }
      } else {
        // Si ça existe pas dedans et que l'utilisateur n'a rien défini dessus alors on renvoie true pour pas avoir une
        // erreur qui soit présente alors qu'elle n'a rien à faire là.
        valid = true;
      }
    }

    this.field.invalid = !valid;
    if(displayMessage) {
      this.field.error_message.hidden = valid;
    }
    return valid;

  }

  /**
   * Fonction permettant de gérer le cas des widgets (datepicker, ckeditor et autocomplete)
   * Quand ils sont en required (car pas géré par ngForm)
    * @returns
   */
  specificInputCheck(): boolean {
    let valid: boolean = true;
    if (this.field.required) {
      if(this.model[this.field.id]) {
        if(!this.model[this.field.id].length) {
          valid = false;
        }
      } else {
        valid = false;
      }
    }
    this.field.invalid = !valid;
    return valid;
  }

}
