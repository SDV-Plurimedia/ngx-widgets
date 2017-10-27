import {Field} from '../_models/field';
import {ValidatorHelper} from './validator_helper';

export class ErrorMessageHelper {

  static defaultErrorMessage(field: Field, model: any) {

    let message = '';

    if(field.required && (!model[field.id] || !model[field.id].length)) {
      message = '<p>Ce champ est requis.</p>';
    }

    switch(field.type) {
      case 'number':
        if(!ValidatorHelper.checkNumber(field, model)) {
          if (field.min !== null && field.max !== null) {
            message += '<p>Merci de saisir une valeur entre ' + field.min + ' et ' + field.max + '</p>';
          } else if (field.min !== null) {
            message += '<p>Merci de saisir une valeur supérieure ou égale à ' + field.min + '</p>';
          } else if (field.max !== null) {
            message += '<p>Merci de saisir une valeur inférieure ou égale à ' + field.max + '</p>';
          }
        }
      break;

      case 'email':
        if (field.invalid && model[field.id] !== '') {
          message += '<p>Merci de saisir une adresse email valide.</p>';
        }
      break;

      case 'url':
        if (!ValidatorHelper.checkUrl(field, model) && model[field.id] !== '') {
          message += '<p>Merci de saisir une URL valide.</p>';
        }
      break;

      default:

      break;
    }

    if (message === '') {
      message = '<p>Une erreur est présente sur ce champ.</p>';
    }

    return message;

  }

}
