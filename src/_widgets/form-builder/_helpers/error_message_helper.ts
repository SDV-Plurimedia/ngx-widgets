import {Field} from '../_models/field';
import {ValidatorHelper} from './validator_helper';

export class ErrorMessageHelper {

  static defaultErrorMessage(field: Field, model: any) {

    let message = '';

    if(field.required && (!model[field.id] || !model[field.id].length)) {
      message = 'Ce champ est requis.<br/>';
    }

    switch(field.type) {
      case 'number':
        if(!ValidatorHelper.checkNumber(field, model)) {
          if (field.min !== null && field.max !== null) {
            message += 'Merci de saisir une valeur entre ' + field.min + ' et ' + field.max + '<br/>';
          } else if (field.min !== null) {
            message += 'Merci de saisir une valeur supérieure ou égale à ' + field.min + '<br/>';
          } else if (field.max !== null) {
            message += 'Merci de saisir une valeur inférieure ou égale à ' + field.max + '<br/>';
          }
        }
      break;

      case 'email':
        if (field.invalid && model[field.id] !== '') {
          message += 'Merci de saisir une adresse email valide.<br/>';
        }
      break;

      case 'url':
        if (!ValidatorHelper.checkUrl(field, model) && model[field.id] !== '') {
          message += 'Merci de saisir une URL valide.<br/>';
        }
      break;

      default:

      break;
    }

    if (message === '') {
      message = 'Une erreur est présente sur ce champ.<br/>';
    }

    return message;

  }

}
