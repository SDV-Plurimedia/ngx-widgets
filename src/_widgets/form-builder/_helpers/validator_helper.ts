import {Field} from '../_models/field';

export class ValidatorHelper {

  /**
   * Vérifie que la valeur est bien un nombre compris entre le min et le max.
   * @param field le champ
   * @param model le model
   * @returns {boolean}
   */
  static checkNumber(field, model: any) {
    let valid: boolean = true;

    if (field.required) {
      if (typeof model[field.id] !== 'number') {
        valid = false;
      }
    }

    if (valid) {
      if (!isNaN(model[field.id])) {

        if (model[field.id] !== null) {
          if (field.max !== null) {
            if (model[field.id] > field.max) {
              return false;
            }
          }

          if (field.min !== null) {
            if (model[field.id] < field.min) {
              return false;
            }
          }
        }
      } else {
        return false;
      }
    }

    return valid;
  }

  /**
   * Vérifie la validité d'une URL (renvoie true si la chaîne est vide).
   * https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
   * @param field
   * @param model
   * @returns {boolean}
   */
  static checkUrl(field, model) {
    let valid: boolean = true;
    let regexp = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})');
    valid = regexp.test(model[field.id]);
    return valid;
  }

}
